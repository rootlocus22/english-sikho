import FeaturesSection from "@/components/FeaturesSection";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">


            <div className="flex-1">
                {/* Hero */}
                <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
                    <div className="container max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Har Situation ke liye <span className="text-blue-600">Perfect Tool</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Office emails, boss ke saath baat, presentations - har cheez ke liye EnglishGyani mein ek solution hai. Aur sab kuch FREE!
                        </p>
                    </div>
                </section>

                {/* Features Detail */}
                <FeaturesSection />

                {/* CTA */}
                <section className="py-20 bg-blue-600 text-white text-center px-4">
                    <div className="container max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Sare features try karo - Bilkul FREE!
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            No credit card, no payment - bas Google se login karo aur shuru ho jao.
                        </p>
                        <a href="/dashboard" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-xl">
                            Try All Features Now
                        </a>
                    </div>
                </section>
            </div>


        </div>
    );
}
