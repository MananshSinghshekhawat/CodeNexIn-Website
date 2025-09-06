const mongoose = require('mongoose');
const Home = require('../models/Home');
const Client = require('../models/Client');
const Testimonial = require('../models/Testimonial');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codenexin');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Home.deleteMany({});
    await Client.deleteMany({});
    await Testimonial.deleteMany({});

    // Create default home content
    const homeContent = new Home({
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
      clientLogos: [
        {
          name: "TechCorp",
          logo: {
            url: "/images/clients/techcorp.png",
            alt: "TechCorp Logo"
          },
          isActive: true,
          order: 1
        },
        {
          name: "CloudMax",
          logo: {
            url: "/images/clients/cloudmax.png",
            alt: "CloudMax Logo"
          },
          isActive: true,
          order: 2
        },
        {
          name: "AIVentures",
          logo: {
            url: "/images/clients/aiventures.png",
            alt: "AIVentures Logo"
          },
          isActive: true,
          order: 3
        },
        {
          name: "NextGen",
          logo: {
            url: "/images/clients/nextgen.png",
            alt: "NextGen Logo"
          },
          isActive: true,
          order: 4
        },
        {
          name: "FutureTech",
          logo: {
            url: "/images/clients/futuretech.png",
            alt: "FutureTech Logo"
          },
          isActive: true,
          order: 5
        },
        {
          name: "SmartSys",
          logo: {
            url: "/images/clients/smartsys.png",
            alt: "SmartSys Logo"
          },
          isActive: true,
          order: 6
        }
      ],
      stats: [
        {
          value: "200+",
          label: "Companies that trust us",
          isActive: true
        },
        {
          value: "500+",
          label: "Projects completed",
          isActive: true
        },
        {
          value: "98%",
          label: "Client satisfaction rate",
          isActive: true
        },
        {
          value: "50+",
          label: "Expert team members",
          isActive: true
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
    });

    await homeContent.save();
    console.log('Default home content created');

    // Create sample testimonials
    const testimonials = [
      {
        clientName: "Sarah Johnson",
        company: "TechCorp Inc.",
        position: "CTO",
        review: "CodeNexIn transformed our outdated systems into a modern, efficient platform. Their expertise in AI integration exceeded our expectations.",
        rating: 5,
        isFeatured: true,
        isActive: true,
        order: 1
      },
      {
        clientName: "Michael Chen",
        company: "DataFlow Solutions",
        position: "CEO",
        review: "The team delivered our project on time and within budget. Their attention to detail and technical skills are outstanding.",
        rating: 5,
        isFeatured: true,
        isActive: true,
        order: 2
      },
      {
        clientName: "Emily Rodriguez",
        company: "InnovateLab",
        position: "Product Manager",
        review: "Working with CodeNexIn was seamless. They understood our vision and brought it to life with exceptional quality.",
        rating: 5,
        isFeatured: true,
        isActive: true,
        order: 3
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Sample testimonials created');

    // Create sample clients
    const clients = [
      {
        name: "TechCorp",
        logo: {
          url: "/images/clients/techcorp.png",
          alt: "TechCorp Logo"
        },
        website: "https://techcorp.com",
        isFeatured: true,
        isActive: true,
        order: 1
      },
      {
        name: "CloudMax",
        logo: {
          url: "/images/clients/cloudmax.png",
          alt: "CloudMax Logo"
        },
        website: "https://cloudmax.com",
        isFeatured: true,
        isActive: true,
        order: 2
      },
      {
        name: "AIVentures",
        logo: {
          url: "/images/clients/aiventures.png",
          alt: "AIVentures Logo"
        },
        website: "https://aiventures.com",
        isFeatured: true,
        isActive: true,
        order: 3
      },
      {
        name: "NextGen",
        logo: {
          url: "/images/clients/nextgen.png",
          alt: "NextGen Logo"
        },
        website: "https://nextgen.com",
        isFeatured: true,
        isActive: true,
        order: 4
      },
      {
        name: "FutureTech",
        logo: {
          url: "/images/clients/futuretech.png",
          alt: "FutureTech Logo"
        },
        website: "https://futuretech.com",
        isFeatured: true,
        isActive: true,
        order: 5
      },
      {
        name: "SmartSys",
        logo: {
          url: "/images/clients/smartsys.png",
          alt: "SmartSys Logo"
        },
        website: "https://smartsys.com",
        isFeatured: true,
        isActive: true,
        order: 6
      }
    ];

    await Client.insertMany(clients);
    console.log('Sample clients created');

    console.log('Database seeded successfully!');
    console.log('You can now start the server with: npm run dev');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();