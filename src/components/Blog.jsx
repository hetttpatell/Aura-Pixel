import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi';

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: '10 Digital Marketing Trends to Watch in 2024',
            excerpt: 'Stay ahead of the curve with these emerging trends that are reshaping the digital marketing landscape.',
            image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop',
            category: 'Marketing',
            date: 'Feb 15, 2024',
            readTime: '5 min read',
        },
        {
            id: 2,
            title: 'How to Maximize Your ROI with Google Ads',
            excerpt: 'Learn the strategies that top marketers use to get the most out of their Google Ads campaigns.',
            image: 'https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=600&h=400&fit=crop',
            category: 'PPC',
            date: 'Feb 10, 2024',
            readTime: '7 min read',
        },
        {
            id: 3,
            title: 'The Ultimate Guide to Social Media Marketing',
            excerpt: 'Master the art of social media marketing with our comprehensive guide covering all major platforms.',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
            category: 'Social Media',
            date: 'Feb 5, 2024',
            readTime: '10 min read',
        },
    ];

    return (
        <section id="blog" className="py-[100px] bg-bg-soft relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(0, 128, 128, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 128, 128, 0.02) 1px, transparent 1px)
            `,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-2 bg-primary-light text-primary-teal font-heading font-semibold text-sm rounded-full mb-4">
                        Our Blog
                    </span>
                    <h2 className="mb-4">
                        Latest <span className="text-gradient">Insights</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-text-body">
                        Stay updated with the latest trends, tips, and strategies in digital marketing
                        from our team of experts.
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="group bg-white rounded-card overflow-hidden shadow-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-text-heading/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-primary-teal text-white text-xs font-semibold rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Meta */}
                                <div className="flex items-center gap-4 text-sm text-text-body mb-3">
                                    <span className="flex items-center gap-1">
                                        <HiOutlineCalendar size={16} />
                                        {post.date}
                                    </span>
                                    <span>{post.readTime}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-heading font-semibold text-text-heading mb-3 group-hover:text-primary-teal transition-colors duration-300 line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-text-body mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>

                                {/* Read More Link */}
                                <motion.a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-primary-teal font-semibold text-sm group/link"
                                    whileHover={{ x: 5 }}
                                >
                                    Read More
                                    <HiOutlineArrowRight className="transition-transform duration-300 group-hover/link:translate-x-1" />
                                </motion.a>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.button
                        className="btn btn-secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View All Articles
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Blog;