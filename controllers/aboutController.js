const About = require('../models/About');

// Get about page content
exports.getAboutContent = async (req, res) => {
  try {
    const aboutContent = await About.getAboutContent();

    // Default content if no about content exists
    const defaultContent = {
      heroSection: {
        title: "Pioneering Digital Innovation Since 2014",
        subtitle: "We are a team of passionate technologists, strategists, and innovators committed to transforming businesses through cutting-edge technology solutions."
      },
      ourStory: {
        title: "Our Story",
        content: "CodeNexIn was founded in 2014 by a group of software engineers who witnessed firsthand the challenges businesses faced in adopting new technologies. We saw companies struggling with outdated systems, inefficient processes, and the inability to harness the power of their data.",
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
      ]
    };

    const response = {
      success: true,
      data: aboutContent || defaultContent
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching about content',
      error: error.message
    });
  }
};

// Update about page content
exports.updateAboutContent = async (req, res) => {
  try {
    const updates = req.body;
    
    let aboutContent = await About.findOne();
    
    if (!aboutContent) {
      aboutContent = new About(updates);
    } else {
      Object.keys(updates).forEach(key => {
        aboutContent[key] = updates[key];
      });
    }
    
    aboutContent.lastUpdated = new Date();
    await aboutContent.save();
    
    res.json({
      success: true,
      message: 'About content updated successfully',
      data: aboutContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating about content',
      error: error.message
    });
  }
};