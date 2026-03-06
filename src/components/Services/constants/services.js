import { BsCameraFill, BsBagCheckFill, BsFilm, BsPenFill } from 'react-icons/bs';
import { MdTrendingUp, MdBrush, MdMicNone } from 'react-icons/md';
import { FaInstagram, FaGoogle, FaFacebook } from 'react-icons/fa';

export const services = [
    {
        name: 'Social Media',
        icon: FaInstagram,
        desc: 'Grow your brand presence',
        iconColor: 'text-rose-500',
        bg: 'bg-rose-50',
        href: '#services',
        subServices: ['Instagram', 'Facebook', 'LinkedIn', 'YouTube']
    },
    {
        name: 'SEO',
        icon: MdTrendingUp,
        desc: 'Rank higher, get found',
        iconColor: 'text-sky-500',
        bg: 'bg-sky-50',
        href: '#services',
        subServices: ['Website SEO', 'On-Page SEO', 'Off-Page SEO', 'Keyword Angles', 'Research and Development', 'GMB', 'YouTube SEO', 'App SEO', 'E-commerce SEO']
    },
    {
        name: 'Google Ads',
        icon: FaGoogle,
        desc: 'Convert clicks to customers',
        iconColor: 'text-orange-500',
        bg: 'bg-orange-50',
        href: '#services',
        subServices: ['PPC Ads', 'Search Ads', 'Display Ads', 'Video Ads', 'App Install Ads', 'Performance MAX', 'Shopping Ads']
    },
    {
        name: 'Meta Ads',
        icon: FaFacebook,
        desc: 'Targeted social advertising',
        iconColor: 'text-blue-600',
        bg: 'bg-blue-50',
        href: '#services',
        subServices: ['Campaign Management', 'Awareness Ads', 'Branding Ads', 'Lead Generation', 'Sales']
    },
    { name: 'E-commerce', icon: BsBagCheckFill, desc: 'Scale your online store', iconColor: 'text-emerald-500', bg: 'bg-emerald-50', href: '#services' },
    { name: 'Content Writing', icon: BsPenFill, desc: 'Words that drive action', iconColor: 'text-violet-500', bg: 'bg-violet-50', href: '#services' },
    { name: 'Podcast Productions', icon: MdMicNone, desc: 'Share your story, your way', iconColor: 'text-red-500', bg: 'bg-red-50', href: '#services' },
    { name: 'Product Photography', icon: BsCameraFill, desc: 'Visuals that sell products', iconColor: 'text-amber-500', bg: 'bg-amber-50', href: '#services' },
    { name: 'Content Creation', icon: MdBrush, desc: 'Creative content at scale', iconColor: 'text-teal-500', bg: 'bg-teal-50', href: '#services' },
    { name: 'Video & Photo Editing', icon: BsFilm, desc: 'Polish every pixel', iconColor: 'text-primary-teal', bg: 'bg-teal-50', href: '#services' },
];
