const Home = require('../models/Home');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');
const Client = require('../models/Client');
const User = require('../models/User'); // ✅ Register User model so populate works

// Get home page content
exports.getHomeContent = async (req, res) => {
  try {
    const homeContent = await Home.getHomeContent();

    const testimonials = await Testimonial.find({ isActive: true, isFeatured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(6);

    const latestBlogs = await Blog.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(3)
      .select('title excerpt slug featuredImage readTime publishedAt')
      .populate('author', 'name');

    const clients = await Client.find({ isActive: true, isFeatured: true })
      .sort({ order: 1 })
      .limit(12);

    // Default content if no home content exists
    const defaultContent = {
      heroBanner: {
        tagline: "Transforming Ideas into Digital Reality",
        subtitle: "CodeNexIn empowers businesses with cutting-edge technology solutions, from AI-powered analytics to scalable cloud platforms. Let's build the future together.",
        ctaButton: { text: "Get Started", link: "/contact" },
        secondaryButton: { text: "View Our Work", link: "/portfolio" }
      },
      keyHighlights: [
        { title: "200+ Companies", description: "Trust CodeNexIn with their digital transformation", icon: "🏢", isActive: true }
      ],
      servicesOverview: [
        { title: "Custom Software Development", description: "Tailored solutions built with cutting-edge technologies.", icon: "💻", link: "/services", order: 1 },
        { title: "Data Analytics & AI", description: "Transform your data into actionable insights.", icon: "📊", link: "/services", order: 2 },
        { title: "Digital Transformation", description: "Modernize business processes for competitive advantage.", icon: "🔄", link: "/services", order: 3 },
        { title: "Cloud Solutions", description: "Scalable cloud infrastructure & migration services.", icon: "☁️", link: "/services", order: 4 }
      ],
      whyChooseUs: [
        { title: "Fast Delivery", description: "Rapid time to market without compromising quality.", icon: "⚡", isActive: true },
        { title: "Expert Team", description: "Seasoned developers with deep expertise.", icon: "👥", isActive: true },
        { title: "Scalable Solutions", description: "Future-proof architecture designed to grow with you.", icon: "📈", isActive: true }
      ],
      pricingPlans: [
        {
          name: "Starter",
          price: "$5,000/project",
          description: "Perfect for small projects and startups",
          features: ["Custom Web App", "Basic API Integration", "3 Months Support", "Documentation", "Code Repo Access"],
          ctaButton: { text: "Get Started", link: "/contact" },
          isPopular: false
        },
        {
          name: "Professional",
          price: "$15,000/project",
          description: "Ideal for growing businesses",
          features: ["Full-Stack Dev", "AI/ML Integration", "Cloud Deployment", "6 Months Support", "Performance Optimization", "Security Audit", "Training Sessions"],
          ctaButton: { text: "Get Started", link: "/contact" },
          isPopular: true
        },
        {
          name: "Enterprise",
          price: "Custom/solution",
          description: "Comprehensive solutions for enterprises",
          features: ["End-to-End Digital Transformation", "Advanced AI Solutions", "Multi-Cloud Architecture", "12+ Months Support", "Dedicated Team", "SLA Guarantee", "Executive Reporting", "24/7 Monitoring"],
          ctaButton: { text: "Contact Sales", link: "/contact" },
          isPopular: false
        }
      ],
      contactInfo: { email: "hello@codenexin.com", phone: "+1 (555) 123-4567", address: "San Francisco, CA" },
      newsletter: { title: "Stay Updated", description: "Subscribe for the latest insights and updates.", placeholder: "Enter your email" }
    };

    res.json({
      success: true,
      data: {
        heroBanner: homeContent?.heroBanner || defaultContent.heroBanner,
        keyHighlights: homeContent?.keyHighlights || defaultContent.keyHighlights,
        servicesOverview: homeContent?.servicesOverview || defaultContent.servicesOverview,
        whyChooseUs: homeContent?.whyChooseUs || defaultContent.whyChooseUs,
        pricingPlans: homeContent?.pricingPlans || defaultContent.pricingPlans,
        testimonials,
        latestBlogs,
        clients,
        contactInfo: homeContent?.contactInfo || defaultContent.contactInfo,
        newsletter: homeContent?.newsletter || defaultContent.newsletter,
        stats: homeContent?.stats || [{ value: "200+", label: "Companies that trust us", isActive: true }]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching home content', error: error.message });
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
      Object.assign(homeContent, updates);
    }

    homeContent.lastUpdated = new Date();
    await homeContent.save();

    res.json({ success: true, message: 'Home content updated successfully', data: homeContent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating home content', error: error.message });
  }
};
