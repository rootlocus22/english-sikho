'use client';

import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';

const testimonials = [
    {
        name: 'Priya Sharma',
        role: 'Marketing Manager',
        company: 'TechCorp India',
        image: '👩‍💼',
        rating: 5,
        text: 'Client calls pe confidently bol paya. Apne aap pe yakeen ho gaya! 3 months mein promotion mil gayi.',
        result: 'Got promoted in 3 months',
        location: 'Mumbai'
    },
    {
        name: 'Amit Kumar',
        role: 'Software Engineer',
        company: 'StartupXYZ',
        image: '👨‍💻',
        rating: 5,
        text: 'Interview mein hesitate nahi kiya. Job mil gayi! EnglishGyani ne confidence diya.',
        result: 'Cracked 2 interviews',
        location: 'Bangalore'
    },
    {
        name: 'Neha Patel',
        role: 'Sales Executive',
        company: 'Global Sales Co.',
        image: '👩‍💼',
        rating: 5,
        text: 'Boss ke saamne presentation dene ka dar khatam ho gaya. Ab confidently present karti hoon.',
        result: '30% salary increase',
        location: 'Delhi'
    },
    {
        name: 'Rahul Mehta',
        role: 'Business Analyst',
        company: 'Consulting Firm',
        image: '👨‍💼',
        rating: 5,
        text: 'MTI issues fix ho gaye. V vs W pronunciation ab perfect hai. Team ne notice kiya!',
        result: 'Improved pronunciation',
        location: 'Pune'
    },
    {
        name: 'Sneha Reddy',
        role: 'HR Manager',
        company: 'MNC Corp',
        image: '👩‍💼',
        rating: 5,
        text: 'Email writing professional ho gayi. Client communication mein confidence aaya.',
        result: 'Better client relations',
        location: 'Hyderabad'
    },
    {
        name: 'Vikram Singh',
        role: 'Project Manager',
        company: 'IT Services',
        image: '👨‍💼',
        rating: 5,
        text: 'Team meetings mein actively participate karta hoon. English hesitation khatam ho gaya.',
        result: 'Better team communication',
        location: 'Chennai'
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50/30">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        Real Stories, Real Results 🎯
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Join 10,000+ professionals who transformed their English and career
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="text-slate-700 font-semibold">4.8/5 from 2,500+ reviews</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((testimonial, i) => (
                        <Card key={i} className="p-6 md:p-8 bg-white border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-3xl flex-shrink-0">
                                    {testimonial.image}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-slate-900">{testimonial.name}</h3>
                                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                                    <p className="text-xs text-slate-500">{testimonial.company} • {testimonial.location}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                                    />
                                ))}
                            </div>

                            <Quote className="w-6 h-6 text-blue-200 mb-3" />
                            <p className="text-slate-700 mb-4 leading-relaxed italic">
                                "{testimonial.text}"
                            </p>

                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-sm font-semibold text-green-600">
                                    ✓ {testimonial.result}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-slate-600 mb-4">
                        <strong className="text-slate-900">10,000+</strong> professionals trust EnglishGyani
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
                        <span>✓ Verified Reviews</span>
                        <span>•</span>
                        <span>✓ Real Users</span>
                        <span>•</span>
                        <span>✓ Proven Results</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

