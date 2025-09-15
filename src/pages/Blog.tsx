import { Calendar, Clock, User, ArrowRight, Heart, Brain, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Heart Disease: Early Warning Signs You Shouldn't Ignore",
      excerpt: "Learn about the subtle symptoms of heart disease that many people overlook and how early detection can save lives.",
      category: "Heart Health",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "/placeholder.svg",
      featured: true,
      icon: Heart
    },
    {
      id: 2,
      title: "Mental Health in the Digital Age: Managing Anxiety and Depression",
      excerpt: "Explore how modern technology affects our mental health and discover effective strategies for maintaining emotional wellbeing.",
      category: "Mental Health",
      author: "Dr. Michael Chen",
      date: "2024-01-12",
      readTime: "7 min read",
      image: "/placeholder.svg",
      featured: false,
      icon: Brain
    },
    {
      id: 3,
      title: "The Complete Guide to Digestive Health: IBS, GERD, and More",
      excerpt: "Comprehensive information about common digestive disorders, their symptoms, and evidence-based treatment approaches.",
      category: "Digestive Health",
      author: "Dr. Emily Rodriguez",
      date: "2024-01-10",
      readTime: "10 min read",
      image: "/placeholder.svg",
      featured: false,
      icon: Activity
    },
    {
      id: 4,
      title: "Women's Health: PCOS Awareness and Management Strategies",
      excerpt: "Everything you need to know about Polycystic Ovary Syndrome, from symptoms to lifestyle changes that can make a difference.",
      category: "Women's Health",
      author: "Dr. Lisa Thompson",
      date: "2024-01-08",
      readTime: "8 min read",
      image: "/placeholder.svg",
      featured: false,
      icon: Heart
    },
    {
      id: 5,
      title: "Respiratory Health: Asthma Management in Adults and Children",
      excerpt: "Learn about asthma triggers, symptoms, and the latest treatment options for better respiratory health.",
      category: "Respiratory",
      author: "Dr. Robert Kim",
      date: "2024-01-05",
      readTime: "6 min read",
      image: "/placeholder.svg",
      featured: false,
      icon: Activity
    },
    {
      id: 6,
      title: "Preventive Care: The Importance of Regular Health Screenings",
      excerpt: "Discover which health screenings you need at different ages and how they can help prevent serious conditions.",
      category: "Prevention",
      author: "Dr. Amanda Foster",
      date: "2024-01-03",
      readTime: "9 min read",
      image: "/placeholder.svg",
      featured: false,
      icon: Activity
    }
  ];

  const categories = ["All", "Heart Health", "Mental Health", "Digestive Health", "Women's Health", "Respiratory", "Prevention"];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Health & Wellness Blog</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert insights, latest research, and practical tips for maintaining optimal health
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Badge variant="default" className="mb-4">Featured Article</Badge>
            </div>
            <div className="card-premium grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <featuredPost.icon className="w-5 h-5 text-primary" />
                  <Badge variant="outline">{featuredPost.category}</Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button className="btn-medical">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="relative h-64 md:h-80 bg-muted rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                  <featuredPost.icon className="w-16 h-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Card key={post.id} className="card-tool group">
                <div className="relative h-48 bg-muted rounded-lg overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                    <post.icon className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <post.icon className="w-4 h-4 text-primary" />
                  <Badge variant="outline" className="text-xs">{post.category}</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated on Health Trends
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest health insights and wellness tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
            />
            <Button className="btn-medical">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;