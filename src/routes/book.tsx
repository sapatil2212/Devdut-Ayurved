import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { TREATMENTS } from "@/lib/treatments";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Please enter a valid phone"),
  email: z
    .string()
    .optional()
    .refine((v) => !v || z.string().email().safeParse(v).success, "Enter a valid email"),
  age: z.string().min(1, "Please enter your age"),
  mode: z.enum(["in-clinic", "virtual"]),
  treatment: z.string().min(1, "Choose an interest"),
  preferredDate: z.string().min(1, "Pick a date"),
  preferredTime: z.string().min(1, "Pick a time"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Devdut Ayurved Clinic" },
      { name: "description", content: "Book an in-clinic consultation with Dr. Ganesh Kumar Patil. We confirm within a working day." },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

function BookPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { mode: "in-clinic", treatment: "", email: "" },
  });

  const onSubmit = async (_: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    navigate({ to: "/thank-you" });
  };

  return (
    <PageShell>
      <PageHeader eyebrow="Book an appointment" title="Reserve your consultation." intro="60 minutes with Dr. Ganesh Kumar Patil. Kindly call first to check availability, then visit the clinic in Pune." />

      <section className="container-page py-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 space-y-5">
            <p className="rounded-2xl border border-[var(--gold)]/30 bg-[var(--cream)] px-4 py-3 text-sm text-[var(--forest-deep)] leading-relaxed">
              Kindly call first to check the availability and then come.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name?.message}>
                <input {...register("name")} className={input} />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register("phone")} className={input} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Age" error={errors.age?.message}>
                <input type="number" min={1} max={120} {...register("age")} className={input} />
              </Field>
              <Field label="Email (optional)" error={errors.email?.message}>
                <input type="email" {...register("email")} className={input} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Consultation mode">
                <select {...register("mode")} className={input}>
                  <option value="in-clinic">In-clinic (Pune)</option>
                  <option value="virtual">Virtual</option>
                </select>
              </Field>
              <Field label="Interest" error={errors.treatment?.message}>
                <select {...register("treatment")} className={input}>
                  <option value="">Select an area</option>
                  {TREATMENTS.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Preferred date" error={errors.preferredDate?.message}>
                <input type="date" {...register("preferredDate")} className={input} />
              </Field>
              <Field label="Preferred time" error={errors.preferredTime?.message}>
                <input type="time" {...register("preferredTime")} className={input} />
              </Field>
            </div>
            <Field label="Anything we should know?">
              <textarea rows={4} {...register("notes")} className={`${input} rounded-3xl`} />
            </Field>
            <Button type="submit" disabled={isSubmitting} className="rounded-full bg-forest-gradient text-[var(--parchment)] h-12 px-8 shadow-gold">
              {isSubmitting ? "Sending…" : "Request appointment"}
            </Button>
            <p className="text-xs text-[var(--muted-foreground)]">We confirm every appointment personally, within one working day.</p>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="rounded-3xl bg-forest-gradient text-[var(--parchment)] p-8 space-y-6">
            <div className="font-sanskrit text-[var(--gold)] text-lg">◈ प्रथम-मीलनम्</div>
            <h2 className="font-display text-3xl">What to expect</h2>
            <ul className="space-y-4 text-[var(--parchment)]/85 text-sm leading-relaxed">
              <li>60 unhurried minutes with Dr. Ganesh Kumar Patil.</li>
              <li>Nadi Pariksha (pulse) and full Prakriti assessment.</li>
              <li>Written plan with herbs, therapies and daily routine.</li>
              <li>Follow-up scheduling and continued care.</li>
            </ul>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
              <div className="text-[var(--gold)] uppercase tracking-widest text-xs mb-1">Fees</div>
              <div>₹1,800 in-clinic · ₹2,500 virtual</div>
            </div>
          </aside>
        </Reveal>
      </section>
    </PageShell>
  );
}

const input = "w-full rounded-full border border-[var(--border)] bg-[var(--parchment)] px-5 py-3 outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30 transition";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1 block text-xs text-[var(--destructive)]">{error}</span>}
    </label>
  );
}
