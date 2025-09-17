const Home = require('../models/Home');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');
const Client = require('../models/Client');

// Get home page content - FIXED
exports.getHomeContent = async (req, res) => {
  try {
    console.log('Fetching home content...');
    
    // Get home content
    const homeContent = await Home.findOne().sort({ createdAt: -1 });
    console.log('Home content found:', !!homeContent);
    
    // Get testimonials
    const testimonials = await Testimonial.find({ isActive: true, isFeatured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(6);
    console.log('Testimonials found:', testimonials.length);
    
    // Get latest blogs
    const latestBlogs = await Blog.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(3)
      .select('title excerpt slug featuredImage readTime publishedAt')
      .populate('author', 'name');
    console.log('Blogs found:', latestBlogs.length);
    
    // Get clients
    const clients = await Client.find({ isActive: true, isFeatured: true })
      .sort({ order: 1 })
      .limit(12);
    console.log('Clients found:', clients.length);

    // Default content if no home content exists
    const defaultContent = {
      heroBanner: {
        tagline: "Transforming Ideas into Digital Reality",
        subtitle: "CodeNexIn empowers businesses with cutting-edge technology solutions, from AI-powered analytics to scalable cloud platforms. Let's build the future together.",
        ctaButton: {
          text: "Get Started",
          link: "/contact"
        },
        secondaryButton: {
          text: "View Our Work",
          link: "/portfolio"
        }
      },
      keyHighlights: [
        {
          title: "200+ Companies",
          description: "Trust CodeNexIn with their digital transformation",
          icon: "🏢",
          isActive: true
        }
      ],
      servicesOverview: [
        {
          title: "Custom Software Development",
          description: "Tailored solutions built with cutting-edge technologies to meet your unique business needs.",
          icon: "💻",
          link: "/services",
          order: 1
        },
        {
          title: "Data Analytics & AI",
          description: "Transform your data into actionable insights with our advanced analytics and machine learning solutions.",
          icon: "📊",
          link: "/services",
          order: 2
        },
        {
          title: "Digital Transformation",
          description: "Modernize your business processes and embrace digital innovation for competitive advantage.",
          icon: "🔄",
          link: "/services",
          order: 3
        },
        {
          title: "Cloud Solutions",
          description: "Scalable cloud infrastructure and migration services to optimize your operations.",
          icon: "☁️",
          link: "/services",
          order: 4
        }
      ],
      whyChooseUs: [
        {
          title: "Fast Delivery",
          description: "Development process ensuring rapid time to market without compromising quality.",
          icon: "⚡",
          isActive: true
        },
        {
          title: "Expert Team",
          description: "Seasoned developers and architects with deep expertise in modern technologies.",
          icon: "👥",
          isActive: true
        },
        {
          title: "Scalable Solutions",
          description: "Future-proof architecture designed to grow with your business needs.",
          icon: "📈",
          isActive: true
        }
      ],
      pricingPlans: [
        {
          name: "Starter",
          price: "$5,000/project",
          description: "Perfect for small projects and startups",
          features: [
            "Custom Web Application",
            "Basic API Integration",
            "3 Months Support",
            "Documentation",
            "Code Repository Access"
          ],
          ctaButton: {
            text: "Get Started",
            link: "/contact"
          },
          isPopular: false
        },
        {
          name: "Professional",
          price: "$15,000/project",
          description: "Ideal for growing businesses",
          features: [
            "Full-Stack Development",
            "AI/ML Integration",
            "Cloud Deployment",
            "6 Months Support",
            "Performance Optimization",
            "Security Audit",
            "Training Sessions"
          ],
          ctaButton: {
            text: "Get Started",
            link: "/contact"
          },
          isPopular: true
        },
        {
          name: "Enterprise",
          price: "Custom/solution",
          description: "Comprehensive solutions for large organizations",
          features: [
            "End-to-End Digital Transformation",
            "Advanced AI Solutions",
            "Multi-Cloud Architecture",
            "12+ Months Support",
            "Dedicated Team",
            "SLA Guarantee",
            "Executive Reporting",
            "24/7 Monitoring"
          ],
          ctaButton: {
            text: "Contact Sales",
            link: "/contact"
          },
          isPopular: false
        }
      ],
      contactInfo: {
        email: "hello@codenexin.com",
        phone: "+1 (555) 123-4567",
        address: "San Francisco, CA"
      },
      newsletter: {
        title: "Stay Updated",
        description: "Subscribe to our newsletter for the latest technology insights and updates.",
        placeholder: "Enter your email"
      }
    };

    const response = {
      success: true,
      data: {
        heroBanner: homeContent?.heroBanner || defaultContent.heroBanner,
        keyHighlights: homeContent?.keyHighlights || defaultContent.keyHighlights,
        servicesOverview: homeContent?.servicesOverview || defaultContent.servicesOverview,
        whyChooseUs: homeContent?.whyChooseUs || defaultContent.whyChooseUs,
        pricingPlans: homeContent?.pricingPlans || defaultContent.pricingPlans,
        testimonials: testimonials,
        latestBlogs: latestBlogs,
        clients: clients,
        contactInfo: homeContent?.contactInfo || defaultContent.contactInfo,
        newsletter: homeContent?.newsletter || defaultContent.newsletter,
        stats: homeContent?.stats || [{ value: "200+", label: "Companies that trust us", isActive: true }],
        clientLogos: homeContent?.clientLogos || [],
        seoMetadata: homeContent?.seoMetadata || {
          title: "CodeNexIn - AI Solutions & Digital Innovation",
          description: "CodeNexIn provides cutting-edge AI solutions, custom software development, and digital transformation services for businesses worldwide.",
          keywords: []
        }
      }
    };

    console.log('Home content response prepared successfully');
    res.json(response);
  } catch (error) {
    console.error('Error fetching home content:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching home content',
      error: error.message
    });
  }
};

// Update home page content (Admin only)
exports.updateHomeContent = async (req, res) => {
  try {
    const updates = req.body;
    
    let homeContent = await Home.findOne();
    
    if (!homeContent) {
      homeContent = new Home(updates);
    } else {
      Object.keys(updates).forEach(key => {
        homeContent[key] = updates[key];
      });
    }
    
    homeContent.lastUpdated = new Date();
    await homeContent.save();
    
    res.json({
      success: true,
      message: 'Home content updated successfully',
      data: homeContent
    });
  } catch (error) {
    console.error('Error updating home content:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating home content',
      error: error.message
    });
  }
};
