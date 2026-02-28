export const metadata = { title: 'Newslates' };

export default function NewslatesPage() {
  return (
    <main className="max-w-5xl mx-auto py-24 px-6">
      <h1 className="text-4xl font-bold mb-4">GD Marketing Newslates</h1>
      <p className="text-lg text-slate-600 mb-8">Subscribe to get the latest product updates, case studies and engineering insights.</p>

      <section className="p-8 bg-white/5 rounded-2xl border border-white/5">
        <h2 className="text-2xl font-semibold mb-2">Subscribe</h2>
        <p className="text-sm text-slate-400 mb-6">Use the footer form to subscribe or visit our homepage to join the list.</p>
        <p className="text-sm text-slate-400">Past issues will be published here soon.</p>
      </section>
    </main>
  );
}
