import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield, Users, Zap } from 'lucide-react'
import Navigation from '@/components/Navigation'

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // DON'T auto-redirect - let user choose where to go
        setUser(session.user)
      }
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // DON'T auto-redirect to dashboard
        setUser(session.user)
        // Show success message and let them choose
        setTimeout(() => {
          navigate('/') // Go back to homepage instead
        }, 1000)
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  // If user is already logged in, show success message
  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to FitScan!</h1>
            <p className="text-muted-foreground mb-6">You're successfully signed in.</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/')}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
              >
                Go to Homepage
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate('/chat')}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
              >
                Try AI Health Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Join FitScan Health Platform
            </h1>
            <p className="text-muted-foreground text-lg">
              Your personal health assessment platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Login Form */}
            <div>
              <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Sign In / Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                  <Auth
                    supabaseClient={supabase}
                    appearance={{ 
                      theme: ThemeSupa,
                      variables: {
                        default: {
                          colors: {
                            brand: '#3b82f6',
                            brandAccent: '#2563eb'
                          }
                        }
                      }
                    }}
                    theme="light"
                    providers={['google']}
                  />
                </CardContent>
              </Card>
              
              <p className="text-center text-xs text-muted-foreground mt-4">
                By signing in, you agree to our{' '}
                <span className="underline cursor-pointer">Terms of Service</span>
                {' '}and{' '}
                <span className="underline cursor-pointer">Privacy Policy</span>
              </p>
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Your health data is encrypted and protected</h3>
                  <p className="text-muted-foreground">We use industry-standard encryption to keep your information secure.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Advanced algorithms for accurate assessments</h3>
                  <p className="text-muted-foreground">Our AI-powered tools provide reliable health insights.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Developed with medical professionals</h3>
                  <p className="text-muted-foreground">Created in collaboration with healthcare experts.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Tailored recommendations for your health journey</h3>
                  <p className="text-muted-foreground">Get personalized advice based on your unique health profile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
