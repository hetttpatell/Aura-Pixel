import { FaInstagram, FaGoogle, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdTrendingUp, MdBrush, MdMicNone, MdOutlineTrendingUp, MdOutlineAnalytics, MdOutlineSpeed } from 'react-icons/md';
import { BsCameraFill, BsBagCheckFill, BsFilm, BsPenFill, BsGraphUp, BsSearch, BsShop, BsMegaphone } from 'react-icons/bs';
import { HiOutlineCode, HiOutlineLightBulb, HiOutlineShare, HiOutlineChartBar, HiOutlineTrendingUp } from 'react-icons/hi';

// Service Categories with their themes and styling
export const serviceCategories = {
    'social-media': {
        id: 'social-media',
        title: 'Social Media Marketing',
        tagline: 'Grow Your Brand Presence Across Platforms',
        description: 'Strategic social media management that transforms your digital presence into a powerful brand-building engine. We create engaging content, manage communities, and drive meaningful conversations.',
        icon: HiOutlineShare,
        gradient: 'from-pink-500 via-rose-500 to-orange-500',
        bgGradient: 'from-rose-50 via-pink-50 to-orange-50',
        primaryColor: '#E4405F',
        stats: [
            { value: '3.5x', label: 'Average Engagement Boost' },
            { value: '150%', label: 'Follower Growth Rate' },
            { value: '50+', label: 'Brands Transformed' }
        ],
        features: [
            'Content Strategy & Planning',
            'Community Management',
            'Influencer Partnerships',
            'Analytics & Reporting',
            'Crisis Management',
            'Trend Monitoring'
        ]
    },
    'seo': {
        id: 'seo',
        title: 'Search Engine Optimization',
        tagline: 'Rank Higher, Get Found, Drive Traffic',
        description: 'Data-driven SEO strategies that put your business at the top of search results. From technical optimization to content strategy, we ensure your website gets the visibility it deserves.',
        icon: BsSearch,
        gradient: 'from-teal-500 via-cyan-500 to-blue-500',
        bgGradient: 'from-teal-50 via-cyan-50 to-blue-50',
        primaryColor: '#008080',
        stats: [
            { value: '85%', label: 'Keywords on Page 1' },
            { value: '200%', label: 'Organic Traffic Growth' },
            { value: '4.5x', label: 'Average ROI' }
        ],
        features: [
            'Technical SEO Audit',
            'Keyword Research & Strategy',
            'On-Page Optimization',
            'Link Building',
            'Local SEO',
            'Content Optimization'
        ]
    },
    'google-ads': {
        id: 'google-ads',
        title: 'Google Ads Management',
        tagline: 'Convert Clicks to Customers with Precision',
        description: 'Performance-driven Google Ads campaigns that maximize your advertising budget. We create targeted campaigns across Search, Display, and YouTube to reach your ideal customers.',
        icon: FaGoogle,
        gradient: 'from-blue-500 via-indigo-500 to-purple-500',
        bgGradient: 'from-blue-50 via-indigo-50 to-purple-50',
        primaryColor: '#4285F4',
        stats: [
            { value: '320%', label: 'Average ROAS' },
            { value: '-45%', label: 'Cost Per Click' },
            { value: '10M+', label: 'Ad Impressions' }
        ],
        features: [
            'Campaign Strategy & Setup',
            'Keyword Research',
            'Ad Copywriting',
            'Bid Management',
            'A/B Testing',
            'Conversion Tracking'
        ]
    },
    'meta-ads': {
        id: 'meta-ads',
        title: 'Meta Advertising',
        tagline: 'Targeted Social Advertising That Converts',
        description: 'Strategic Facebook and Instagram advertising that reaches your perfect audience. We create scroll-stopping ads that drive engagement, leads, and sales across Meta platforms.',
        icon: FaFacebook,
        gradient: 'from-blue-600 via-indigo-600 to-purple-600',
        bgGradient: 'from-blue-50 via-indigo-50 to-purple-50',
        primaryColor: '#0A66C2',
        stats: [
            { value: '4.2x', label: 'Average ROAS' },
            { value: '2M+', label: 'Leads Generated' },
            { value: '30%', label: 'Lower CPA' }
        ],
        features: [
            'Audience Targeting',
            'Creative Design',
            'Campaign Management',
            'Retargeting',
            'Lookalike Audiences',
            'Performance Analytics'
        ]
    },
    'e-commerce': {
        id: 'e-commerce',
        title: 'E-Commerce Solutions',
        tagline: 'Scale Your Online Store to New Heights',
        description: 'End-to-end e-commerce solutions that drive sales and optimize your online store performance. From store setup to conversion optimization, we help you sell more.',
        icon: BsBagCheckFill,
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        bgGradient: 'from-emerald-50 via-teal-50 to-cyan-50',
        primaryColor: '#10B981',
        stats: [
            { value: '180%', label: 'Revenue Growth' },
            { value: '45%', label: 'Conversion Rate' },
            { value: '100+', label: 'Stores Launched' }
        ],
        features: [
            'Store Development',
            'Product Optimization',
            'Payment Integration',
            'Inventory Management',
            'Cart Recovery',
            'Performance Analytics'
        ]
    },
    'content-writing': {
        id: 'content-writing',
        title: 'Content Writing',
        tagline: 'Words That Drive Action and Engagement',
        description: 'Compelling content that tells your brand story and drives conversions. Our expert writers create SEO-optimized content that resonates with your audience and ranks on search engines.',
        icon: BsPenFill,
        gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
        bgGradient: 'from-violet-50 via-purple-50 to-fuchsia-50',
        primaryColor: '#8B5CF6',
        stats: [
            { value: '1000+', label: 'Articles Written' },
            { value: '95%', label: 'Client Satisfaction' },
            { value: '60%', label: 'More Engagement' }
        ],
        features: [
            'Blog Writing',
            'Website Copy',
            'Product Descriptions',
            'Email Campaigns',
            'Social Media Content',
            'White Papers'
        ]
    },
    'podcast-productions': {
        id: 'podcast-productions',
        title: 'Podcast Productions',
        tagline: 'Share Your Story, Your Way',
        description: 'Professional podcast production services that help you create high-quality audio content. From recording to distribution, we handle everything so you can focus on your message.',
        icon: MdMicNone,
        gradient: 'from-red-500 via-rose-500 to-pink-500',
        bgGradient: 'from-red-50 via-rose-50 to-pink-50',
        primaryColor: '#EF4444',
        stats: [
            { value: '200+', label: 'Episodes Produced' },
            { value: '1M+', label: 'Total Downloads' },
            { value: '50+', label: 'Active Shows' }
        ],
        features: [
            'Recording & Editing',
            'Show Notes Writing',
            'Distribution Setup',
            'Audio Enhancement',
            'Intro/Outro Creation',
            'Transcription'
        ]
    },
    'product-photography': {
        id: 'product-photography',
        title: 'Product Photography',
        tagline: 'Visuals That Sell Products',
        description: 'Stunning product photography that showcases your products in the best light. High-quality images that drive conversions and elevate your brand image across all platforms.',
        icon: BsCameraFill,
        gradient: 'from-amber-500 via-orange-500 to-yellow-500',
        bgGradient: 'from-amber-50 via-orange-50 to-yellow-50',
        primaryColor: '#F59E0B',
        stats: [
            { value: '5000+', label: 'Products Shot' },
            { value: '35%', label: 'Conversion Lift' },
            { value: '100+', label: 'Happy Clients' }
        ],
        features: [
            'Studio Photography',
            'Lifestyle Shots',
            '360° Product Views',
            'Photo Editing',
            'Amazon-Ready Images',
            'Batch Processing'
        ]
    },
    'content-creation': {
        id: 'content-creation',
        title: 'Content Creation',
        tagline: 'Creative Content at Scale',
        description: 'Multi-format content creation that keeps your brand top-of-mind. From graphics to videos, we produce engaging content that captures attention and drives engagement.',
        icon: MdBrush,
        gradient: 'from-teal-500 via-cyan-500 to-sky-500',
        bgGradient: 'from-teal-50 via-cyan-50 to-sky-50',
        primaryColor: '#14B8A6',
        stats: [
            { value: '10K+', label: 'Assets Created' },
            { value: '3x', label: 'Engagement Rate' },
            { value: '75+', label: 'Active Campaigns' }
        ],
        features: [
            'Graphic Design',
            'Video Production',
            'Motion Graphics',
            'Infographics',
            'Reels & Shorts',
            'Brand Assets'
        ]
    },
    'video-photo-editing': {
        id: 'video-photo-editing',
        title: 'Video & Photo Editing',
        tagline: 'Polish Every Pixel to Perfection',
        description: 'Professional editing services that transform raw footage and photos into polished masterpieces. Color correction, retouching, and post-production that makes your visuals shine.',
        icon: BsFilm,
        gradient: 'from-cyan-600 via-teal-600 to-emerald-600',
        bgGradient: 'from-cyan-50 via-teal-50 to-emerald-50',
        primaryColor: '#0891B2',
        stats: [
            { value: '500+', label: 'Videos Edited' },
            { value: '15K+', label: 'Photos Retouched' },
            { value: '24h', label: 'Turnaround Time' }
        ],
        features: [
            'Color Grading',
            'Photo Retouching',
            'Video Cutting',
            'Sound Design',
            'Visual Effects',
            'Format Conversion'
        ]
    }
};

// Sub-services detailed content
export const subServicesContent = {
    // Social Media Sub-services
    'instagram': {
        id: 'instagram',
        title: 'Instagram Marketing',
        category: 'social-media',
        description: 'Build a visually stunning Instagram presence that attracts followers and drives engagement.',
        icon: FaInstagram,
        color: '#E4405F',
        features: [
            'Feed & Story Content Strategy',
            'Reels Creation & Optimization',
            'Hashtag Research & Strategy',
            'Influencer Collaborations',
            'Instagram Shopping Setup',
            'Analytics & Insights Tracking'
        ],
        benefits: [
            'Increased brand visibility',
            'Higher engagement rates',
            'Better conversion tracking',
            'Stronger community building'
        ],
        process: [
            { step: 1, title: 'Audit & Strategy', desc: 'Analyze current presence and develop growth strategy' },
            { step: 2, title: 'Content Creation', desc: 'Design visually appealing content calendar' },
            { step: 3, title: 'Community Building', desc: 'Engage with audience and grow followers' },
            { step: 4, title: 'Optimization', desc: 'Analyze metrics and refine approach' }
        ]
    },
    'facebook': {
        id: 'facebook',
        title: 'Facebook Marketing',
        category: 'social-media',
        description: 'Leverage the world\'s largest social network to build community and drive business results.',
        icon: FaFacebook,
        color: '#1877F2',
        features: [
            'Business Page Optimization',
            'Content Strategy & Calendar',
            'Facebook Group Management',
            'Ad Campaign Integration',
            'Messenger Automation',
            'Event Promotion'
        ],
        benefits: [
            'Broader audience reach',
            'Enhanced customer service',
            'Detailed targeting options',
            'Comprehensive analytics'
        ],
        process: [
            { step: 1, title: 'Page Setup', desc: 'Optimize page structure and branding' },
            { step: 2, title: 'Content Planning', desc: 'Create engaging post calendar' },
            { step: 3, title: 'Community Growth', desc: 'Build and nurture follower base' },
            { step: 4, title: 'Performance Review', desc: 'Track and improve metrics' }
        ]
    },
    'linkedin': {
        id: 'linkedin',
        title: 'LinkedIn Marketing',
        category: 'social-media',
        description: 'Establish thought leadership and generate B2B leads through professional networking.',
        icon: FaLinkedin,
        color: '#0A66C2',
        features: [
            'Company Page Optimization',
            'Thought Leadership Content',
            'Employee Advocacy Programs',
            'Lead Generation Campaigns',
            'LinkedIn Article Publishing',
            'Recruitment Support'
        ],
        benefits: [
            'Quality B2B leads',
            'Professional credibility',
            'Industry networking',
            'Talent acquisition'
        ],
        process: [
            { step: 1, title: 'Profile Optimization', desc: 'Enhance company and executive profiles' },
            { step: 2, title: 'Content Strategy', desc: 'Develop professional content plan' },
            { step: 3, title: 'Network Building', desc: 'Connect with industry professionals' },
            { step: 4, title: 'Lead Nurturing', desc: 'Convert connections to customers' }
        ]
    },
    'youtube': {
        id: 'youtube',
        title: 'YouTube Marketing',
        category: 'social-media',
        description: 'Create compelling video content that ranks and builds a loyal subscriber base.',
        icon: FaYoutube,
        color: '#FF0000',
        features: [
            'Channel Optimization',
            'Video SEO Strategy',
            'Thumbnail Design',
            'Content Planning',
            'Monetization Setup',
            'Community Management'
        ],
        benefits: [
            'Long-term content value',
            'SEO benefits',
            'Multiple revenue streams',
            'Brand authority building'
        ],
        process: [
            { step: 1, title: 'Channel Audit', desc: 'Optimize channel layout and branding' },
            { step: 2, title: 'Video Strategy', desc: 'Plan content that ranks and engages' },
            { step: 3, title: 'Production', desc: 'Create high-quality video content' },
            { step: 4, title: 'Growth Hacking', desc: 'Implement tactics to boost subscribers' }
        ]
    },

    // SEO Sub-services
    'website-seo': {
        id: 'website-seo',
        title: 'Website SEO',
        category: 'seo',
        description: 'Comprehensive website optimization to improve search visibility and user experience.',
        icon: BsSearch,
        color: '#008080',
        features: [
            'Technical SEO Audit',
            'Site Structure Optimization',
            'XML Sitemap Creation',
            'Robots.txt Optimization',
            'Schema Markup Implementation',
            'Core Web Vitals Improvement'
        ],
        benefits: [
            'Better crawlability',
            'Improved rankings',
            'Faster load times',
            'Enhanced user experience'
        ],
        process: [
            { step: 1, title: 'Technical Audit', desc: 'Identify and fix technical issues' },
            { step: 2, title: 'Structure Optimization', desc: 'Improve site architecture' },
            { step: 3, title: 'Content Audit', desc: 'Optimize existing content' },
            { step: 4, title: 'Monitoring', desc: 'Track improvements and ROI' }
        ]
    },
    'on-page-seo': {
        id: 'on-page-seo',
        title: 'On-Page SEO',
        category: 'seo',
        description: 'Optimize individual web pages to rank higher and earn more relevant traffic.',
        icon: MdOutlineTrendingUp,
        color: '#10B981',
        features: [
            'Title Tag Optimization',
            'Meta Description Writing',
            'Header Tag Structure',
            'Image Optimization',
            'Internal Linking',
            'Content Optimization'
        ],
        benefits: [
            'Higher click-through rates',
            'Better content relevance',
            'Improved user engagement',
            'Stronger topical authority'
        ],
        process: [
            { step: 1, title: 'Keyword Mapping', desc: 'Assign keywords to pages' },
            { step: 2, title: 'Content Optimization', desc: 'Enhance page elements' },
            { step: 3, title: 'Technical Fixes', desc: 'Resolve on-page issues' },
            { step: 4, title: 'Performance Tracking', desc: 'Monitor ranking improvements' }
        ]
    },
    'off-page-seo': {
        id: 'off-page-seo',
        title: 'Off-Page SEO',
        category: 'seo',
        description: 'Build authority through strategic link building and brand mentions across the web.',
        icon: MdOutlineAnalytics,
        color: '#3B82F6',
        features: [
            'Link Building Campaigns',
            'Guest Posting',
            'Digital PR',
            'Brand Mention Monitoring',
            'Influencer Outreach',
            'Social Signals'
        ],
        benefits: [
            'Higher domain authority',
            'Increased referral traffic',
            'Brand credibility',
            'Better search rankings'
        ],
        process: [
            { step: 1, title: 'Backlink Audit', desc: 'Analyze current link profile' },
            { step: 2, title: 'Strategy Development', desc: 'Plan link acquisition' },
            { step: 3, title: 'Outreach Execution', desc: 'Build quality backlinks' },
            { step: 4, title: 'Authority Building', desc: 'Monitor and improve DA/DR' }
        ]
    },
    'keyword-angles': {
        id: 'keyword-angles',
        title: 'Keyword Angles',
        category: 'seo',
        description: 'Strategic keyword research that identifies high-value search opportunities.',
        icon: BsGraphUp,
        color: '#8B5CF6',
        features: [
            'Competitor Keyword Analysis',
            'Long-tail Keyword Research',
            'Search Intent Analysis',
            'Keyword Clustering',
            'SERP Feature Targeting',
            'Local Keyword Research'
        ],
        benefits: [
            'Targeted traffic growth',
            'Lower competition',
            'Higher conversion potential',
            'Content direction clarity'
        ],
        process: [
            { step: 1, title: 'Discovery', desc: 'Research industry keywords' },
            { step: 2, title: 'Analysis', desc: 'Evaluate competition and volume' },
            { step: 3, title: 'Prioritization', desc: 'Identify quick wins' },
            { step: 4, title: 'Implementation', desc: 'Integrate into content' }
        ]
    },
    'research-and-development': {
        id: 'research-and-development',
        title: 'R&D SEO',
        category: 'seo',
        description: 'Advanced SEO research to stay ahead of algorithm changes and industry trends.',
        icon: HiOutlineLightBulb,
        color: '#F59E0B',
        features: [
            'Algorithm Update Analysis',
            'Competitor Strategy Research',
            'Industry Trend Monitoring',
            'New Opportunity Identification',
            'AI & Search Trends',
            'Voice Search Optimization'
        ],
        benefits: [
            'Future-proof strategy',
            'Competitive advantage',
            'Early trend adoption',
            'Innovation leadership'
        ],
        process: [
            { step: 1, title: 'Market Research', desc: 'Analyze industry landscape' },
            { step: 2, title: 'Trend Analysis', desc: 'Identify emerging patterns' },
            { step: 3, title: 'Strategy Testing', desc: 'Experiment with new tactics' },
            { step: 4, title: 'Implementation', desc: 'Roll out proven strategies' }
        ]
    },
    'gmb': {
        id: 'gmb',
        title: 'Google Business Profile',
        category: 'seo',
        description: 'Optimize your Google Business Profile to dominate local search results.',
        icon: FaGoogle,
        color: '#4285F4',
        features: [
            'Profile Optimization',
            'Post Management',
            'Review Management',
            'Q&A Management',
            'Photo Optimization',
            'Insights Analysis'
        ],
        benefits: [
            'Local pack rankings',
            'More foot traffic',
            'Better local visibility',
            'Trust building'
        ],
        process: [
            { step: 1, title: 'Profile Setup', desc: 'Complete business information' },
            { step: 2, title: 'Optimization', desc: 'Enhance all profile elements' },
            { step: 3, title: 'Content Strategy', desc: 'Plan posts and updates' },
            { step: 4, title: 'Reputation', desc: 'Manage reviews and ratings' }
        ]
    },
    'youtube-seo': {
        id: 'youtube-seo',
        title: 'YouTube SEO',
        category: 'seo',
        description: 'Optimize your YouTube videos to rank in both YouTube and Google search.',
        icon: FaYoutube,
        color: '#FF0000',
        features: [
            'Video Title Optimization',
            'Description & Tag Strategy',
            'Thumbnail Optimization',
            'Playlist Organization',
            'End Screen Strategy',
            'Caption Optimization'
        ],
        benefits: [
            'Higher video rankings',
            'More organic views',
            'Better suggested video placement',
            'Cross-platform visibility'
        ],
        process: [
            { step: 1, title: 'Channel Audit', desc: 'Analyze current performance' },
            { step: 2, title: 'Keyword Research', desc: 'Find video opportunities' },
            { step: 3, title: 'Optimization', desc: 'Enhance video elements' },
            { step: 4, title: 'Monitoring', desc: 'Track ranking improvements' }
        ]
    },
    'app-seo': {
        id: 'app-seo',
        title: 'App Store Optimization',
        category: 'seo',
        description: 'Improve your app\'s visibility in App Store and Google Play search results.',
        icon: MdOutlineSpeed,
        color: '#14B8A6',
        features: [
            'App Title Optimization',
            'Description Writing',
            'Keyword Optimization',
            'Screenshot Design',
            'Review Management',
            'A/B Testing'
        ],
        benefits: [
            'Higher app rankings',
            'More organic downloads',
            'Better conversion rates',
            'Reduced acquisition costs'
        ],
        process: [
            { step: 1, title: 'App Audit', desc: 'Review current listing' },
            { step: 2, title: 'Keyword Research', desc: 'Identify target keywords' },
            { step: 3, title: 'Creative Optimization', desc: 'Enhance visuals and copy' },
            { step: 4, title: 'Launch', desc: 'Deploy and monitor results' }
        ]
    },
    'e-commerce-seo': {
        id: 'e-commerce-seo',
        title: 'E-Commerce SEO',
        category: 'seo',
        description: 'Drive organic traffic to your online store with specialized e-commerce SEO.',
        icon: BsShop,
        color: '#EC4899',
        features: [
            'Product Page Optimization',
            'Category Page SEO',
            'Schema for Products',
            'Review Integration',
            'Faceted Navigation',
            'Site Speed Optimization'
        ],
        benefits: [
            'More organic sales',
            'Higher product visibility',
            'Better user experience',
            'Reduced ad dependency'
        ],
        process: [
            { step: 1, title: 'Store Audit', desc: 'Identify SEO opportunities' },
            { step: 2, title: 'Technical Fixes', desc: 'Resolve e-commerce issues' },
            { step: 3, title: 'Content Creation', desc: 'Optimize product content' },
            { step: 4, title: 'Growth Tracking', desc: 'Monitor organic revenue' }
        ]
    },

    // Google Ads Sub-services
    'ppc-ads': {
        id: 'ppc-ads',
        title: 'PPC Advertising',
        category: 'google-ads',
        description: 'Strategic pay-per-click campaigns that maximize ROI and drive conversions.',
        icon: BsMegaphone,
        color: '#4285F4',
        features: [
            'Campaign Structure Setup',
            'Bid Strategy Management',
            'Ad Copywriting',
            'Landing Page Optimization',
            'Conversion Tracking',
            'A/B Testing'
        ],
        benefits: [
            'Immediate visibility',
            'Measurable results',
            'Budget control',
            'Targeted reach'
        ],
        process: [
            { step: 1, title: 'Strategy', desc: 'Define goals and targeting' },
            { step: 2, title: 'Setup', desc: 'Build campaigns and ads' },
            { step: 3, title: 'Launch', desc: 'Deploy with tracking' },
            { step: 4, title: 'Optimize', desc: 'Continuous improvement' }
        ]
    },
    'search-ads': {
        id: 'search-ads',
        title: 'Search Ads',
        category: 'google-ads',
        description: 'Capture high-intent search traffic with targeted Google Search campaigns.',
        icon: BsSearch,
        color: '#34A853',
        features: [
            'Keyword Research',
            'Ad Group Structure',
            'Responsive Search Ads',
            'Ad Extensions Setup',
            'Negative Keywords',
            'Quality Score Optimization'
        ],
        benefits: [
            'High-intent traffic',
            'Immediate leads',
            'Brand protection',
            'Competitive positioning'
        ],
        process: [
            { step: 1, title: 'Research', desc: 'Identify valuable keywords' },
            { step: 2, title: 'Creation', desc: 'Build search campaigns' },
            { step: 3, title: 'Launch', desc: 'Go live with monitoring' },
            { step: 4, title: 'Refine', desc: 'Optimize based on data' }
        ]
    },
    'display-ads': {
        id: 'display-ads',
        title: 'Display Ads',
        category: 'google-ads',
        description: 'Build brand awareness with visually engaging display advertising.',
        icon: HiOutlineChartBar,
        color: '#FBBC04',
        features: [
            'Banner Design',
            'Audience Targeting',
            'Placement Management',
            'Remarketing Campaigns',
            'Responsive Ads',
            'Gmail Ads'
        ],
        benefits: [
            'Brand awareness',
            'Visual storytelling',
            'Broad reach',
            'Retargeting capabilities'
        ],
        process: [
            { step: 1, title: 'Design', desc: 'Create compelling visuals' },
            { step: 2, title: 'Targeting', desc: 'Define audience segments' },
            { step: 3, title: 'Placement', desc: 'Select optimal sites' },
            { step: 4, title: 'Optimize', desc: 'Refine for performance' }
        ]
    },
    'video-ads': {
        id: 'video-ads',
        title: 'Video Ads',
        category: 'google-ads',
        description: 'Engage audiences with compelling video advertising on YouTube and beyond.',
        icon: BsFilm,
        color: '#FF0000',
        features: [
            'Video Production',
            'YouTube Advertising',
            'In-Stream Ads',
            'Discovery Ads',
            'Bumper Ads',
            'Video Remarketing'
        ],
        benefits: [
            'High engagement',
            'Brand storytelling',
            'Precise targeting',
            'Measurable impact'
        ],
        process: [
            { step: 1, title: 'Concept', desc: 'Develop video strategy' },
            { step: 2, title: 'Production', desc: 'Create video content' },
            { step: 3, title: 'Campaign', desc: 'Set up video ads' },
            { step: 4, title: 'Analysis', desc: 'Measure and optimize' }
        ]
    },
    'app-install-ads': {
        id: 'app-install-ads',
        title: 'App Install Ads',
        category: 'google-ads',
        description: 'Drive app downloads with targeted install campaigns across Google networks.',
        icon: MdOutlineSpeed,
        color: '#14B8A6',
        features: [
            'Universal App Campaigns',
            'Install Optimization',
            'In-App Event Tracking',
            'Creative Testing',
            'Audience Segmentation',
            'CPI Optimization'
        ],
        benefits: [
            'Scalable downloads',
            'Quality users',
            'Cross-network reach',
            'Cost efficiency'
        ],
        process: [
            { step: 1, title: 'Setup', desc: 'Configure app campaigns' },
            { step: 2, title: 'Creative', desc: 'Design app assets' },
            { step: 3, title: 'Launch', desc: 'Go live across networks' },
            { step: 4, title: 'Scale', desc: 'Optimize for volume' }
        ]
    },
    'performance-max': {
        id: 'performance-max',
        title: 'Performance Max',
        category: 'google-ads',
        description: 'Maximize conversions with Google\'s AI-powered campaign type across all channels.',
        icon: MdTrendingUp,
        color: '#EA4335',
        features: [
            'Cross-Channel Campaigns',
            'AI-Powered Optimization',
            'Audience Signals',
            'Asset Group Management',
            'Conversion Goals',
            'Insights Analysis'
        ],
        benefits: [
            'Maximum reach',
            'AI optimization',
            'Simplified management',
            'Better conversions'
        ],
        process: [
            { step: 1, title: 'Strategy', desc: 'Define conversion goals' },
            { step: 2, title: 'Assets', desc: 'Create diverse creatives' },
            { step: 3, title: 'Signals', desc: 'Provide audience data' },
            { step: 4, title: 'Learn', desc: 'Let AI optimize' }
        ]
    },
    'shopping-ads': {
        id: 'shopping-ads',
        title: 'Shopping Ads',
        category: 'google-ads',
        description: 'Showcase your products with visual shopping campaigns that drive sales.',
        icon: BsBagCheckFill,
        color: '#FBBC04',
        features: [
            'Product Feed Optimization',
            'Google Merchant Center',
            'Smart Shopping Campaigns',
            'Local Inventory Ads',
            'Showcase Shopping',
            'Performance Analysis'
        ],
        benefits: [
            'Visual product ads',
            'High purchase intent',
            'Qualified traffic',
            'Revenue growth'
        ],
        process: [
            { step: 1, title: 'Feed Setup', desc: 'Optimize product data' },
            { step: 2, title: 'Campaign', desc: 'Create shopping ads' },
            { step: 3, title: 'Bidding', desc: 'Set ROAS goals' },
            { step: 4, title: 'Scale', desc: 'Grow profitable products' }
        ]
    },

    // Meta Ads Sub-services
    'campaign-management': {
        id: 'campaign-management',
        title: 'Campaign Management',
        category: 'meta-ads',
        description: 'End-to-end Meta advertising management for maximum performance.',
        icon: HiOutlineChartBar,
        color: '#1877F2',
        features: [
            'Campaign Strategy',
            'Ad Account Setup',
            'Budget Allocation',
            'A/B Testing',
            'Performance Monitoring',
            'Monthly Reporting'
        ],
        benefits: [
            'Expert management',
            'Time savings',
            'Better performance',
            'Strategic insights'
        ],
        process: [
            { step: 1, title: 'Discovery', desc: 'Understand business goals' },
            { step: 2, title: 'Strategy', desc: 'Plan campaign approach' },
            { step: 3, title: 'Execution', desc: 'Launch and manage' },
            { step: 4, title: 'Optimization', desc: 'Continuous improvement' }
        ]
    },
    'awareness-ads': {
        id: 'awareness-ads',
        title: 'Awareness Ads',
        category: 'meta-ads',
        description: 'Build brand recognition with strategic awareness campaigns on Facebook and Instagram.',
        icon: BsMegaphone,
        color: '#34A853',
        features: [
            'Brand Storytelling',
            'Reach Optimization',
            'Video Views',
            'Brand Lift Studies',
            'Frequency Management',
            'Audience Building'
        ],
        benefits: [
            'Brand recognition',
            'Wider reach',
            'Lower CPM',
            'Audience growth'
        ],
        process: [
            { step: 1, title: 'Branding', desc: 'Define brand message' },
            { step: 2, title: 'Creative', desc: 'Design awareness content' },
            { step: 3, title: 'Targeting', desc: 'Build broad audiences' },
            { step: 4, title: 'Measure', desc: 'Track brand metrics' }
        ]
    },
    'branding-ads': {
        id: 'branding-ads',
        title: 'Branding Ads',
        category: 'meta-ads',
        description: 'Establish a strong brand identity through consistent visual advertising.',
        icon: MdBrush,
        color: '#8B5CF6',
        features: [
            'Visual Identity',
            'Creative Consistency',
            'Brand Guidelines',
            'Storytelling',
            'Emotional Connection',
            'Brand Recall'
        ],
        benefits: [
            'Strong identity',
            'Memorable presence',
            'Trust building',
            'Premium perception'
        ],
        process: [
            { step: 1, title: 'Identity', desc: 'Define brand elements' },
            { step: 2, title: 'Guidelines', desc: 'Create brand rules' },
            { step: 3, title: 'Creative', desc: 'Develop branded ads' },
            { step: 4, title: 'Deploy', desc: 'Consistent execution' }
        ]
    },
    'lead-generation': {
        id: 'lead-generation',
        title: 'Lead Generation',
        category: 'meta-ads',
        description: 'Capture qualified leads with optimized Meta lead generation campaigns.',
        icon: HiOutlineTrendingUp,
        color: '#EA4335',
        features: [
            'Lead Form Ads',
            'Instant Forms',
            'CRM Integration',
            'Lead Qualification',
            'Follow-up Automation',
            'Cost Per Lead Optimization'
        ],
        benefits: [
            'Qualified leads',
            'Lower CPL',
            'Faster conversion',
            'Scalable volume'
        ],
        process: [
            { step: 1, title: 'Funnel', desc: 'Design lead flow' },
            { step: 2, title: 'Forms', desc: 'Create lead forms' },
            { step: 3, title: 'Nurture', desc: 'Set up follow-up' },
            { step: 4, title: 'Optimize', desc: 'Reduce lead cost' }
        ]
    },
    'sales': {
        id: 'sales',
        title: 'Sales Campaigns',
        category: 'meta-ads',
        description: 'Drive direct sales with conversion-optimized Meta advertising.',
        icon: BsGraphUp,
        color: '#F59E0B',
        features: [
            'Conversion Optimization',
            'Dynamic Product Ads',
            'Catalog Sales',
            'Retargeting',
            'ROAS Optimization',
            'Purchase Tracking'
        ],
        benefits: [
            'Direct revenue',
            'Measurable ROAS',
            'Repeat customers',
            'Scalable sales'
        ],
        process: [
            { step: 1, title: 'Setup', desc: 'Configure pixel and catalog' },
            { step: 2, title: 'Funnel', desc: 'Map customer journey' },
            { step: 3, title: 'Launch', desc: 'Go live with tracking' },
            { step: 4, title: 'Scale', desc: 'Increase profitable spend' }
        ]
    }
};

// Helper function to get service by ID
export const getServiceById = (id) => {
    return serviceCategories[id] || null;
};

// Helper function to get sub-service by ID
export const getSubServiceById = (id) => {
    return subServicesContent[id] || null;
};

// Helper function to get sub-services by category
export const getSubServicesByCategory = (categoryId) => {
    return Object.values(subServicesContent).filter(
        sub => sub.category === categoryId
    );
};

// Helper function to get all service IDs
export const getAllServiceIds = () => {
    return Object.keys(serviceCategories);
};

// Helper function to get all sub-service IDs
export const getAllSubServiceIds = () => {
    return Object.keys(subServicesContent);
};

// Helper to check if ID is a service or sub-service
export const getContentById = (id) => {
    const service = getServiceById(id);
    if (service) return { type: 'service', data: service };

    const subService = getSubServiceById(id);
    if (subService) return { type: 'sub-service', data: subService };

    return null;
};

export default {
    serviceCategories,
    subServicesContent,
    getServiceById,
    getSubServiceById,
    getSubServicesByCategory,
    getAllServiceIds,
    getAllSubServiceIds,
    getContentById
};
