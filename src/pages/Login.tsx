import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield, Users, Zap } from 'lucide-react'
import Navigation from '@/components/Navigation'

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate('/dashboard')
      }
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Welcome to <span className="text-primary">FitScan</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your personal health assessment platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg">Secure & Private</h3>
                    <p className="text-muted-foreground">Your health data is encrypted and protected</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <Zap className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg">AI Powered</h3>
                    <p className="text-muted-foreground">Advanced algorithms for accurate assessments</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg">Expert Backed</h3>
                    <p className="text-muted-foreground">Developed with medical professionals</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <Heart className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg">Personalized</h3>
                    <p className="text-muted-foreground">Tailored recommendations for your health journey</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Sign In to Continue</CardTitle>
              </CardHeader>
              <CardContent>
                <Auth
                  supabaseClient={supabase}
                  appearance={{
                    theme: ThemeSupa,
                    variables: {
                      default: {
                        colors: {
                          brand: 'hsl(221.2 83.2% 53.3%)',
                          brandAccent: 'hsl(221.2 83.2% 53.3%)',
                        },
                      },
                    },
                  }}
                  providers={['google']}
                  redirectTo={`${window.location.origin}/dashboard`}
                />
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our{' '}
              <span className="text-primary underline cursor-pointer">Terms of Service</span>
              {' '}and{' '} 
              <span className="text-primary underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
