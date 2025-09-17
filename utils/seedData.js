const mongoose = require('mongoose');
const Home = require('../models/Home');
const Client = require('../models/Client');
const Testimonial = require('../models/Testimonial');
const About = require('../models/About');
const Service = require('../models/Service');
const ContactInfo = require('../models/ContactInfo');
const Portfolio = require('../models/Portfolio');
require('dotenv').config();

// Seed About Page Data
const seedAboutData = async () => {
  try {
    await About.deleteMany({});

    const aboutContent = new About({
      heroSection: {
        title: "Pioneering Digital Innovation Since 2014",
        subtitle: "We are a team of passionate technologists, strategists, and innovators committed to transforming businesses through cutting-edge technology solutions."
      },
      ourStory: {
        title: "Our Story",
        content: "CodeNexIn was founded in 2014 by a group of software engineers who witnessed firsthand the challenges businesses faced in adopting new technologies. We saw companies struggling with outdated systems, inefficient processes, and the inability to harness the power of their data. What started as a small consulting firm has evolved into a comprehensive technology partner, serving clients from startups to Fortune 500 companies.",
        milestones: [
          {
            year: 2014,
            title: "Foundation",
            description: "CodeNexIn was founded with a vision to bridge the gap between ideas and digital reality"
          },
          {
            year: 2018,
            title: "Expansion",
            description: "Expanded our services to include AI and machine learning solutions"
          },
          {
            year: 2020,
            title: "Growth",
            description: "Served our 100th client and expanded our team to 50+ experts"
          },
          {
            year: 2023,
            title: "Innovation",
            description: "Launched our proprietary AI-powered analytics platform"
          }
        ]
      },
      mission: {
        title: "Our Mission",
        description: "To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital age.",
        principles: [
          {
            title: "Excellence in Delivery",
            description: "We strive for perfection in every project, ensuring solutions that exceed expectations.",
            icon: "🎯"
          },
          {
            title: "Client-Centric Approach",
            description: "Our clients' success is our success. We build long-term partnerships based on trust and results.",
            icon: "🤝"
          },
          {
            title: "Continuous Innovation",
            description: "We stay at the forefront of technology, constantly learning and adapting to new developments.",
            icon: "🚀"
          }
        ]
      },
      vision: {
        title: "Our Vision",
        description: "To be the leading catalyst for digital transformation, enabling businesses to thrive in an increasingly technology-driven world."
      },
      coreValues: {
        title: "Our Core Values",
        description: "The principles that guide everything we do and shape how we work with our clients and each other.",
        values: [
          {
            title: "Innovation",
            description: "We push boundaries and embrace emerging technologies to deliver cutting-edge solutions.",
            icon: "💡"
          },
          {
            title: "Quality",
            description: "Every project is built with the highest standards of code quality and security.",
            icon: "🏆"
          },
          {
            title: "Collaboration",
            description: "We work closely with our clients as trusted partners in their digital transformation.",
            icon: "👥"
          },
          {
            title: "Reliability",
            description: "Consistent delivery and unwavering commitment to our promises and timelines.",
            icon: "⏱️"
          }
        ]
      },
      whyChooseUs: {
        title: "Why Choose CodeNexIn?",
        description: "We bring together technical expertise, industry knowledge, and a passion for innovation to deliver exceptional results.",
        features: [
          {
            title: "Proven Expertise",
            description: "10+ years of experience delivering successful projects across various industries.",
            icon: "📊",
            stats: {
              value: "10+",
              label: "Years Experience"
            }
          },
          {
            title: "Full-Stack Solutions",
            description: "End-to-end development from concept to deployment and ongoing maintenance.",
            icon: "🛠️",
            stats: {
              value: "500+",
              label: "Projects Completed"
            }
          },
          {
            title: "Agile Methodology",
            description: "Fast, iterative development process with continuous client feedback and improvement.",
            icon: "🔄",
            stats: {
              value: "98%",
              label: "Client Satisfaction"
            }
          },
          {
            title: "Industry Recognition",
            description: "Award-winning team recognized for innovation and excellence in software development.",
            icon: "🏅",
            stats: {
              value: "25+",
              label: "Awards Won"
            }
          }
        ]
      },
      teamStats: [
        {
          value: "50+",
          label: "Expert Team Members",
          icon: "👨‍💻"
        },
        {
          value: "200+",
          label: "Happy Clients",
          icon: "😊"
        },
        {
          value: "98%",
          label: "Client Retention Rate",
          icon: "📈"
        },
        {
          value: "24/7",
          label: "Support Available",
          icon: "🌐"
        }
      ],
      seoMetadata: {
        title: "About CodeNexIn - Our Story, Mission & Values",
        description: "Learn about CodeNexIn's journey since 2014, our mission to drive digital transformation, and the core values that guide our work with clients.",
        keywords: ["about", "company", "story", "mission", "values", "team"]
      }
    });

    await aboutContent.save();
    console.log('About page content created successfully');
  } catch (error) {
    console.error('Error seeding about data:', error);
  }
};

// Seed Services Page Data
const seedServicesData = async () => {
  try {
    await Service.deleteMany({});

    const servicesContent = new Service({
      heroSection: {
        title: "Comprehensive Technology Solutions",
        subtitle: "From custom software development to AI implementation, we offer a full spectrum of technology services to help your business thrive in the digital age."
      },
      services: [
        {
          title: "Custom Software Development",
          slug: "custom-software-development",
          description: "End-to-end software solutions tailored to your specific business needs and requirements.",
          icon: "",
          keyFeatures: [
            "Web Application Development",
            "Enterprise Software Solutions",
            "API Development & Integration",
            "Legacy System Modernization"
          ],
          technologies: ["React", "Node.js", "Python", "Java", ".NET"],
          useCases: [
            {
              industry: "Healthcare",
              description: "Custom EHR systems and patient management solutions"
            },
            {
              industry: "Finance",
              description: "Secure banking and financial management applications"
            },
            {
              industry: "Retail",
              description: "E-commerce platforms and inventory management systems"
            }
          ],
          isActive: true,
          order: 1
        },
        {
          title: "AI & Machine Learning",
          slug: "ai-machine-learning",
          description: "Harness the power of artificial intelligence to automate processes and gain insights.",
          icon: "🤖",
          keyFeatures: [
            "Predictive Analytics",
            "Natural Language Processing",
            "Computer Vision Solutions",
            "AI Chatbots & Virtual Assistants"
          ],
          technologies: ["TensorFlow", "PyTorch", "OpenAI", "Scikit-learn", "Pandas"],
          useCases: [
            {
              industry: "Healthcare",
              description: "Medical image analysis and diagnostic assistance"
            },
            {
              industry: "E-commerce",
              description: "Personalized recommendations and customer behavior prediction"
            },
            {
              industry: "Manufacturing",
              description: "Predictive maintenance and quality control"
            }
          ],
          isActive: true,
          order: 2
        },
        {
          title: "Data Analytics & BI",
          slug: "data-analytics-bi",
          description: "Transform raw data into actionable insights with advanced analytics and visualization.",
          icon: "📊",
          keyFeatures: [
            "Data Warehouse Design",
            "Real-time Analytics Dashboards",
            "Business Intelligence Solutions",
            "Data Migration & Integration"
          ],
          technologies: ["Tableau", "Power BI", "Apache Spark", "SQL", "MongoDB"],
          useCases: [
            {
              industry: "Finance",
              description: "Risk analysis and investment insights"
            },
            {
              industry: "Marketing",
              description: "Customer segmentation and campaign performance analysis"
            },
            {
              industry: "Operations",
              description: "Supply chain optimization and logistics analysis"
            }
          ],
          isActive: true,
          order: 3
        },
        {
          title: "Cloud Solutions",
          slug: "cloud-solutions",
          description: "Scalable and secure cloud infrastructure to support your growing business needs.",
          icon: "☁️",
          keyFeatures: [
            "Cloud Migration & Strategy",
            "DevOps & CI/CD Implementation",
            "Serverless Architecture",
            "Cloud Security & Compliance"
          ],
          technologies: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker"],
          useCases: [
            {
              industry: "Startups",
              description: "Scalable infrastructure for rapid growth"
            },
            {
              industry: "Enterprise",
              description: "Hybrid cloud solutions and multi-cloud strategies"
            },
            {
              industry: "Healthcare",
              description: "HIPAA-compliant cloud infrastructure"
            }
          ],
          isActive: true,
          order: 4
        },
        {
          title: "Digital Transformation",
          slug: "digital-transformation",
          description: "Comprehensive digital strategy and implementation to modernize your business operations.",
          icon: "🔄",
          keyFeatures: [
            "Digital Strategy Consulting",
            "Process Automation",
            "System Integration",
            "Change Management"
          ],
          technologies: ["Salesforce", "Microsoft 365", "Zapier", "ServiceNow", "SAP"],
          useCases: [
            {
              industry: "Manufacturing",
              description: "Industry 4.0 and smart factory implementation"
            },
            {
              industry: "Education",
              description: "Digital learning platforms and student management systems"
            },
            {
              industry: "Government",
              description: "Digital citizen services and e-governance"
            }
          ],
          isActive: true,
          order: 5
        },
        {
          title: "Mobile Development",
          slug: "mobile-development",
          description: "Native and cross-platform mobile applications that engage and delight your users.",
          icon: "📱",
          keyFeatures: [
            "iOS & Android Development",
            "Cross-platform Solutions",
            "Mobile App UI/UX Design",
            "App Store Optimization"
          ],
          technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin"],
          useCases: [
            {
              industry: "Healthcare",
              description: "Telemedicine and patient monitoring apps"
            },
            {
              industry: "Retail",
              description: "Mobile shopping and loyalty applications"
            },
            {
              industry: "Fitness",
              description: "Health tracking and workout applications"
            }
          ],
          isActive: true,
          order: 6
        },
        {
          title: "Cybersecurity",
          slug: "cybersecurity",
          description: "Protect your digital assets with comprehensive security solutions and best practices.",
          icon: "🔒",
          keyFeatures: [
            "Security Audits & Assessments",
            "Penetration Testing",
            "Compliance Management",
            "Security Training"
          ],
          technologies: ["OWASP", "SOC 2", "ISO 27001", "GDPR", "HIPAA"],
          useCases: [
            {
              industry: "Finance",
              description: "Financial data protection and compliance"
            },
            {
              industry: "Healthcare",
              description: "Patient data security and HIPAA compliance"
            },
            {
              industry: "E-commerce",
              description: "Payment security and fraud prevention"
            }
          ],
          isActive: true,
          order: 7
        },
        {
          title: "Consulting & Strategy",
          slug: "consulting-strategy",
          description: "Strategic technology consulting to align your IT investments with business objectives.",
          icon: "📈",
          keyFeatures: [
            "Technology Roadmapping",
            "Architecture Reviews",
            "Vendor Selection",
            "Project Management"
          ],
          technologies: ["Agile", "Scrum", "TOGAF", "ITIL", "PMI"],
          useCases: [
            {
              industry: "Enterprise",
              description: "IT strategy and digital transformation roadmap"
            },
            {
              industry: "Startups",
              description: "Technology stack selection and architecture planning"
            },
            {
              industry: "Non-profit",
              description: "Cost-effective technology solutions and implementation"
            }
          ],
          isActive: true,
          order: 8
        }
      ],
      industries: [
        {
          name: "Healthcare",
          description: "HIPAA-compliant solutions for medical practices and healthcare providers",
          icon: "🏥",
          isActive: true
        },
        {
          name: "Finance",
          description: "Secure financial applications and banking solutions",
          icon: "💰",
          isActive: true
        },
        {
          name: "Retail",
          description: "E-commerce platforms and retail management systems",
          icon: "🛒",
          isActive: true
        },
        {
          name: "Education",
          description: "Learning management systems and educational technology",
          icon: "🎓",
          isActive: true
        },
        {
          name: "Manufacturing",
          description: "Industry 4.0 and smart factory solutions",
          icon: "🏭",
          isActive: true
        },
        {
          name: "Government",
          description: "Digital governance and citizen service platforms",
          icon: "🏛️",
          isActive: true
        }
      ],
      ctaSection: {
        title: "Ready to Transform Your Business?",
        description: "Let's discuss how our technology solutions can help you achieve your business goals. Our team of experts is ready to guide you through your digital transformation journey.",
        buttons: [
          {
            text: "Schedule a Consultation",
            link: "/contact",
            variant: "primary"
          },
          {
            text: "View Our Portfolio",
            link: "/portfolio",
            variant: "secondary"
          }
        ]
      },
      seoMetadata: {
        title: "Services - CodeNexIn Technology Solutions",
        description: "Discover our comprehensive technology services including custom software development, AI solutions, data analytics, cloud services, and digital transformation.",
        keywords: ["services", "technology", "software development", "AI", "cloud", "consulting"]
      }
    });

    await servicesContent.save();
    console.log('Services page content created successfully');
  } catch (error) {
    console.error('Error seeding services data:', error);
  }
};

// seed portfolio page data

const seedPortfolioData = async () => {
  try {
    await Portfolio.deleteMany({});

    const portfolioItems = [
      {
        title: "RetailBot Customer Assistant",
        slug: "retailbot-customer-assistant",
        description: "Intelligent chatbot that provides personalized shopping experiences and customer support.",
        detailedDescription: "A comprehensive AI-powered customer service solution that handles inquiries, provides product recommendations, and processes orders seamlessly.",
        category: "AI Solutions",
        client: {
          name: "MegaRetail Corp",
          industry: "Retail",
          logo: {
            url: "/images/clients/megaretail.png",
            alt: "MegaRetail Corp Logo"
          }
        },
        year: 2023,
        keyOutcomes: [
          { title: "Reduction in support tickets", value: "70%" },
          { title: "Increase in customer satisfaction", value: "45%" },
          { title: "Boost in conversion rates", value: "35%" }
        ],
        technologies: [
          { name: "OpenAI GPT", category: "AI/ML" },
          { name: "Dialogflow", category: "NLP" },
          { name: "React", category: "Frontend" },
          { name: "Node.js", category: "Backend" }
        ],
        images: [
          {
            url: "/images/portfolio/retailbot-1.jpg",
            alt: "RetailBot Dashboard",
            caption: "Customer service dashboard",
            isPrimary: true
          }
        ],
        featured: true,
        status: "completed",
        projectDuration: {
          startDate: new Date('2023-01-15'),
          endDate: new Date('2023-06-20'),
          duration: "5 months"
        },
        teamSize: 8,
        projectUrl: "https://retailbot.demo.com",
        caseStudyUrl: "/case-studies/retailbot",
        order: 1,
        isActive: true
      },
      {
        title: "DataViz Analytics Dashboard",
        slug: "dataviz-analytics-dashboard",
        description: "Comprehensive business intelligence platform with predictive analytics and real-time insights.",
        detailedDescription: "An advanced analytics platform that transforms raw data into actionable insights with interactive visualizations and predictive capabilities.",
        category: "Data Analytics",
        client: {
          name: "Growth Analytics Inc",
          industry: "Technology",
          logo: {
            url: "/images/clients/growth-analytics.png",
            alt: "Growth Analytics Logo"
          }
        },
        year: 2023,
        keyOutcomes: [
          { title: "Faster decision making", value: "300%" },
          { title: "Improvement in forecast accuracy", value: "50%" },
          { title: "Reduction in manual reporting", value: "90%" }
        ],
        technologies: [
          { name: "Tableau", category: "Visualization" },
          { name: "Python", category: "Backend" },
          { name: "AWS", category: "Cloud" },
          { name: "Machine Learning", category: "AI/ML" }
        ],
        images: [
          {
            url: "/images/portfolio/dataviz-1.jpg",
            alt: "DataViz Dashboard",
            caption: "Interactive analytics interface",
            isPrimary: true
          }
        ],
        featured: true,
        status: "completed",
        projectDuration: {
          startDate: new Date('2023-02-10'),
          endDate: new Date('2023-08-15'),
          duration: "6 months"
        },
        teamSize: 12,
        projectUrl: "https://dataviz.demo.com",
        order: 2,
        isActive: true
      },
      {
        title: "AgriTech Crop Optimization",
        slug: "agritech-crop-optimization",
        description: "AI-powered system for crop yield prediction and optimization using satellite imagery and IoT data.",
        detailedDescription: "A precision agriculture solution that leverages satellite data, IoT sensors, and machine learning to optimize crop yields and resource usage.",
        category: "AI Solutions",
        client: {
          name: "Smart Farms Collective",
          industry: "Agriculture",
          logo: {
            url: "/images/clients/smart-farms.png",
            alt: "Smart Farms Logo"
          }
        },
        year: 2023,
        keyOutcomes: [
          { title: "Increase in crop yield", value: "25%" },
          { title: "Reduction in water usage", value: "30%" },
          { title: "Decrease in pesticide use", value: "40%" }
        ],
        technologies: [
          { name: "Computer Vision", category: "AI/ML" },
          { name: "IoT Integration", category: "IoT" },
          { name: "Satellite APIs", category: "Data" },
          { name: "ML Models", category: "AI/ML" }
        ],
        images: [
          {
            url: "/images/portfolio/agritech-1.jpg",
            alt: "Crop Monitoring Interface",
            caption: "Real-time crop health monitoring",
            isPrimary: true
          }
        ],
        featured: true,
        status: "completed",
        projectDuration: {
          startDate: new Date('2023-03-01'),
          endDate: new Date('2023-09-30'),
          duration: "7 months"
        },
        teamSize: 10,
        projectUrl: "https://agritech.demo.com",
        order: 3,
        isActive: true
      },
      {
        title: "MedAI Diagnostic Assistant",
        slug: "medai-diagnostic-assistant",
        description: "AI-powered diagnostic support system that assists healthcare professionals in early disease detection.",
        detailedDescription: "A medical AI platform that analyzes medical images and patient data to assist doctors in early diagnosis and treatment planning.",
        category: "Healthcare",
        client: {
          name: "Regional Medical Center",
          industry: "Healthcare",
          logo: {
            url: "/images/clients/regional-medical.png",
            alt: "Regional Medical Center Logo"
          }
        },
        year: 2024,
        keyOutcomes: [
          { title: "Faster diagnosis time", value: "40%" },
          { title: "Accuracy in early detection", value: "95%" },
          { title: "Reduction in diagnostic errors", value: "60%" }
        ],
        technologies: [
          { name: "TensorFlow", category: "AI/ML" },
          { name: "Computer Vision", category: "AI/ML" },
          { name: "Python", category: "Backend" },
          { name: "Medical APIs", category: "Integration" }
        ],
        images: [
          {
            url: "/images/portfolio/medai-1.jpg",
            alt: "MedAI Diagnostic Interface",
            caption: "Medical image analysis dashboard",
            isPrimary: true
          }
        ],
        featured: true,
        status: "completed",
        projectDuration: {
          startDate: new Date('2024-01-10'),
          endDate: new Date('2024-07-15'),
          duration: "6 months"
        },
        teamSize: 15,
        projectUrl: "https://medai.demo.com",
        order: 4,
        isActive: true
      }
    ];

    await Portfolio.insertMany(portfolioItems);
    console.log('Portfolio data seeded successfully');
  } catch (error) {
    console.error('Error seeding portfolio data:', error);
  }
};

// Seed Contact Page Data

const seedContactData = async () => {
  try {
    await ContactInfo.deleteMany({});

    const contactInfo = new ContactInfo({
      companyName: "CodeNexIn",
      email: "hello@codenexin.com",
      phone: "+1 (555) 123-4567",
      address: {
        street: "123 Tech Street, Suite 456",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        country: "USA"
      },
      businessHours: {
        mondayToFriday: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Closed",
        timezone: "PST"
      },
      emergencySupport: {
        available: true,
        description: "For urgent technical support or critical issues, our emergency support team is available 24/7.",
        contact: "+1 (555) EMERGENCY"
      },
      socialMedia: {
        linkedin: "https://linkedin.com/company/codenexin",
        twitter: "https://twitter.com/codenexin",
        github: "https://github.com/codenexin",
        facebook: "https://facebook.com/codenexin"
      },
      responseTime: "24 hours"
    });

    await contactInfo.save();
    console.log('Contact information created successfully');
  } catch (error) {
    console.error('Error seeding contact data:', error);
  }
};

// Main seed function
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codenexin');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Home.deleteMany({});
    await Client.deleteMany({});
    await Testimonial.deleteMany({});
    await About.deleteMany({});
    await Service.deleteMany({});
    await ContactInfo.deleteMany({});
    await Portfolio.deleteMany({});
    

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

    // Seed About page data
    await seedAboutData();

    // Seed Services page data
    await seedServicesData();

    // seed contact page data 
    await seedContactData();

    // seed portfolio page data
    await seedPortfolioData();

    console.log('Database seeded successfully!');
    console.log('You can now start the server with: npm run dev');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

module.exports = seedData;
