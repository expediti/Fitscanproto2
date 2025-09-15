import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import toast from 'react-hot-toast'
import { 
  LogOut, Heart, Activity, TrendingUp, Award, Calendar, User, 
  Camera, Upload, Zap, Target, Shield, Star, ChevronRight,
  BarChart3, Clock, CheckCircle2, Trophy, Sparkles,
  Users, BookOpen, MessageCircle, Settings, Plus,
  Flame, Brain, Moon, Sun, ArrowUp, Download,
  Stethoscope, Pill, Apple, Dumbbell
} from 'lucide-react'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileImage, setProfileImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          navigate('/login')
          return
        }
        setUser(user)
        setProfileImage(user.user_metadata?.avatar_url || '')
        setLoading(false)
      } catch (error) {
        console.error('Error getting user:', error)
        navigate('/login')
      }
    }

    getUser()
  }, [navigate])

  const handleImageUpload = async (event) => {
    try {
      setUploading(true)
      const file = event.target.files[0]
      if (!file) return

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPG, PNG, GIF, or WebP)')
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB')
        return
      }

      toast.loading('Uploading image...', { id: 'upload' })

      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`
      
      // Upload new image
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      const newAvatarUrl = publicData.publicUrl
      setProfileImage(newAvatarUrl)
      
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: newAvatarUrl }
      })

      if (updateError) throw updateError

      toast.success('Profile picture updated successfully! ✨', { id: 'upload' })

    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Error uploading image. Please try again.', { id: 'upload' })
    } finally {
      setUploading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Signed out successfully!')
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Error signing out')
    }
  }

  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0]
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'there'
  }

  const getInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || 'User'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="relative mx-auto w-16 h-16">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
              <div className="absolute inset-2 animate-pulse rounded-full bg-primary/20"></div>
            </div>
            <p className="mt-6 text-lg text-muted-foreground font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header with Profile */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Profile Image Section */}
                <div className="relative group">
                  <Avatar className="h-28 w-28 ring-4 ring-primary/20 transition-all group-hover:ring-primary/40">
                    <AvatarImage src={profileImage} className="object-cover" />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/70 text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    {uploading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <Camera className="h-5 w-5 text-white" />
                        <span className="text-xs text-white font-medium">Change</span>
                      </div>
                    )}
                  </label>
                </div>

                {/* Welcome Message */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                      Welcome back, {getUserName()}!
                    </h1>
                    <div className="animate-bounce">
                      <Sparkles className="h-8 w-8 text-yellow-500" />
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-lg">{user?.email}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified Account
                    </Badge>
                    <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                      <Star className="h-3 w-3 mr-1" />
                      New Member
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <Button variant="outline" onClick={() => navigate('/profile')} className="group">
                    <User className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Profile
                  </Button>
                  <Button variant="outline" onClick={handleSignOut} className="group">
                    <LogOut className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-full">
                <Trophy className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-800 dark:text-green-400 text-xl">🎉 Authentication Successful!</h3>
                <p className="text-green-700 dark:text-green-300 mt-1">
                  Your Google OAuth login is working perfectly. Welcome to FitScan!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 group border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <Heart className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">Ready to start!</p>
              <Progress value={0} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 group border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">--</div>
              <p className="text-xs text-muted-foreground mt-1">Take an assessment</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 group border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                <Award className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">🏆</div>
              <p className="text-xs text-muted-foreground mt-1">Welcome badge</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 group border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
                <Calendar className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Date().toLocaleDateString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Just joined!</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Section */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary" />
              Get Started with Your Health Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                size="lg"
                className="h-20 flex flex-col gap-2 group"
                onClick={() => navigate('/')}
              >
                <Heart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Take Assessment</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="h-20 flex flex-col gap-2 group"
                onClick={() => navigate('/about')}
              >
                <BarChart3 className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Learn More</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="h-20 flex flex-col gap-2 group"
                onClick={() => navigate('/blog')}
              >
                <TrendingUp className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Health Tips</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
