const Service = require('../models/Service');

// Get services page content
exports.getServicesContent = async (req, res) => {
  try {
    const servicesContent = await Service.getServicesContent();

    // Default content if no services content exists
    const defaultContent = {
      heroSection: {
        title: "Comprehensive Technology Solutions",
        subtitle: "From custom software development to AI implementation, we offer a full spectrum of technology services to help your business thrive in the digital age."
      },
      services: [
        {
          title: "Custom Software Development",
          slug: "custom-software-development",
          description: "End-to-end software solutions tailored to your specific business needs and requirements.",
          icon: "💻",
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
          ctaButton: {
            text: "Get Started",
            link: "/contact"
          },
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
          ctaButton: {
            text: "Get Started",
            link: "/contact"
          },
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
          ctaButton: {
            text: "Get Started",
            link: "/contact"
          },
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
          ctaButton: {
            text: "Get Started",
            link: "/contact"
          },
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
          ctaButton: {
            text: "Get Started",
            link: "/contact"
          },
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
          ctaButton: {
            text: "Get Started",
            link: "/contact"
          },
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
          ctaButton: {
            text: "Get Started",
            link: "/contact"
          },
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
          ctaButton: {
            text: "Get Started",
            link: "/contact"
          },
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
      }
    };

    const response = {
      success: true,
      data: servicesContent || defaultContent
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services content',
      error: error.message
    });
  }
};

// Get single service by slug
exports.getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const servicesContent = await Service.getServicesContent();
    
    if (!servicesContent) {
      return res.status(404).json({
        success: false,
        message: 'Services content not found'
      });
    }

    const service = servicesContent.services.find(s => s.slug === slug);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
      error: error.message
    });
  }
};

// Update services content
exports.updateServicesContent = async (req, res) => {
  try {
    const updates = req.body;
    
    let servicesContent = await Service.findOne();
    
    if (!servicesContent) {
      servicesContent = new Service(updates);
    } else {
      Object.keys(updates).forEach(key => {
        servicesContent[key] = updates[key];
      });
    }
    
    servicesContent.lastUpdated = new Date();
    await servicesContent.save();
    
    res.json({
      success: true,
      message: 'Services content updated successfully',
      data: servicesContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating services content',
      error: error.message
    });
  }
};