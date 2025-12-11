import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SEO_KEYWORDS } from "@/data/seo-keywords";
import { SCENARIO_DATA } from "@/data/scenarios";
import Link from "next/link";
import FeaturesSection from "@/components/FeaturesSection";
import { ArrowRight, CheckCircle2, Star, Users, Bot, Mail, Mic } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              ✨ India ki pehli AI English Coach
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Corporate English <span className="text-blue-600">बिना झिझक</span> के सीखो
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed">
              Office emails, boss ke saath baat, presentations - sab kuch AI ke saath practice karo.<br />
              <span className="text-slate-500 text-lg">Koi judge nahi karega. Bas improve hote raho!</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
                  Free mein shuru karo <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 hover:bg-slate-50">
                  Kya-kya hai? Dekhiye
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Credit card nahi chahiye</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Rozana 3 free sessions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-3xl font-bold text-slate-900">4.8/5</p>
              <p className="text-slate-600">User ratings</p>
            </div>
            <div>
              <Users className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-900">10,000+</p>
              <p className="text-slate-600">Happy learners</p>
            </div>
            <div>
              <Bot className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-900">50,000+</p>
              <p className="text-slate-600">AI sessions completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Aapke liye kya hai? */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Aapke liye kya-kya hai?</h2>
            <p className="text-xl text-slate-600">Har situation ke liye ek tool - bilkul FREE!</p>
          </div>
          <FeaturesSection />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Classes vs EnglishGyani - Kya fark hai?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg text-slate-500">Traditional Classes</CardTitle>
                <ul className="space-y-3 mt-4 text-slate-600">
                  <li className="flex items-start gap-2">❌ Mahenge (₹5,000-15,000/month)</li>
                  <li className="flex items-start gap-2">❌ Fixed timings - office ke baad rush</li>
                  <li className="flex items-start gap-2">❌ Sab ke saamne bolna padta hai</li>
                  <li className="flex items-start gap-2">❌ Travel time waste</li>
                </ul>
              </CardHeader>
            </Card>
            <Card className="border-2 border-blue-500 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-700">EnglishGyani (Aap!)</CardTitle>
                <ul className="space-y-3 mt-4 text-slate-700">
                  <li className="flex items-start gap-2">✅ Free shuru karo (₹0)</li>
                  <li className="flex items-start gap-2">✅ 24/7 available - jab mann kare</li>
                  <li className="flex items-start gap-2">✅ Bilkul private - koi judge nahi</li>
                  <li className="flex items-start gap-2">✅ Ghar se, office se, kahin se!</li>
                </ul>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links to Scenarios */}
      <section className="py-20 px-4 bg-slate-50 border-y">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Taiyaar templates - bas edit karo aur bhejo!</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                <Mail className="w-5 h-5 text-blue-600" /> Email Templates
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {SCENARIO_DATA.email.slice(0, 8).map(item => (
                  <Link key={item.slug} href={`/dashboard/templates/email/${item.slug}`}
                    className="text-slate-600 hover:text-blue-600 hover:underline hover:translate-x-1 transition-all">
                    → {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                <ArrowRight className="w-5 h-5 text-blue-600" /> Vocabulary Tips
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {SCENARIO_DATA.vocabulary.map(item => (
                  <Link key={item.slug} href={`/dashboard/templates/vocabulary/${item.slug}`}
                    className="text-slate-600 hover:text-blue-600 hover:underline hover:translate-x-1 transition-all">
                    → {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Apni English Journey aaj se shuru karo! 🚀</h2>
          <p className="text-xl text-blue-100 mb-8">
            Har din practice karo. Har din behtar bano. Bilkul free mein!
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="font-bold h-14 px-10 text-lg shadow-xl hover:shadow-2xl transition-all">
              Sign Up karo - Free hai!
            </Button>
          </Link>
          <p className="mt-4 text-sm text-blue-200">⚡ 2 minute mein shuru ho jao</p>
        </div>
      </section>

      {/* SEO Footer Links */}
      <section className="py-12 px-4 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-sm font-bold mb-6 text-slate-700 uppercase tracking-wider">Popular Searches (Popular Khoj)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2 text-xs text-slate-600">
            {SEO_KEYWORDS.slice(0, 48).map(k => (
              <Link key={k.slug} href={`/learn/${k.slug}`} className="hover:text-blue-600 transition-colors truncate">
                {k.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


