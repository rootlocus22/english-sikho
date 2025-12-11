import EmailDecoder from "@/components/EmailDecoder";

export default function ReplyHelperPage() {
    return (
        <div className="max-w-5xl mx-auto w-full py-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Reply Helper</h1>
            <p className="text-slate-500 mb-8">Don't know how to reply? Upload a screenshot of the message.</p>
            <EmailDecoder />
        </div>
    );
}
