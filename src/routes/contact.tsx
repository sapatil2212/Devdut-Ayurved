import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { TREATMENTS } from "@/lib/treatments";
import contactHeroImg from "@/assets/contact-hero.png";
import type { ReactNode } from "react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Please enter a valid phone"),
  email: z
    .string()
    .optional()
    .refine((v) => !v || z.string().email().safeParse(v).success, "Enter a valid email"),
  age: z.string().min(1, "Please enter your age"),
  treatment: z.string().min(1, "Choose a treatment"),
  preferredDate: z.string().min(1, "Pick a date"),
  preferredTime: z.string().min(1, "Pick a time"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  "mt-1 w-full rounded-full border border-[var(--border)] bg-[var(--parchment)] px-5 py-3 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30 transition";

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <span className="mt-1 block text-xs text-[var(--destructive)]">{error}</span>}
    </label>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Devdut Ayurved Clinic" },
      { name: "description", content: `Visit us in Pune, call ${SITE.phone}, WhatsApp or email — we reply within a working day.` },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { treatment: "", email: "" },
  });

  const onSubmit = async (_: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    reset();
    navigate({ to: "/thank-you" });
  };

  return (
    <PageShell>
      <PageHeader
        sanskrit="संपर्कः सेवायाः आरम्भः"
        title="Come see us, or call."
        intro="We answer every message ourselves. No call centres, no bots."
        image={contactHeroImg}
        imageHeightClass="min-h-[42vh] md:min-h-[60vh]"
        imageAlignClass="justify-center md:justify-start"
      />

      <section className="container-page py-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="order-2 lg:order-1">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 space-y-6">
            <div>
              <div className="eyebrow mb-2">Visit</div>
              <div className="flex items-start gap-3"><MapPin className="size-5 text-[var(--gold)] mt-0.5" /><span>{SITE.address}</span></div>
            </div>
            <div>
              <div className="eyebrow mb-2">Call / WhatsApp</div>
              <div className="flex flex-col gap-3">
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-[var(--copper)]">
                  <Phone className="size-5 text-[var(--gold)]" />
                  <span>Call: {SITE.phone}</span>
                </a>
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[var(--copper)]">
                  <MessageCircle className="size-5 text-green-500 fill-green-500" />
                  <span>WhatsApp: {SITE.whatsapp}</span>
                </a>
              </div>
            </div>
            <div>
              <div className="eyebrow mb-2">Email</div>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-[var(--copper)]"><Mail className="size-5 text-[var(--gold)]" />{SITE.email}</a>
            </div>
            <div>
              <div className="eyebrow mb-2">Hours</div>
              <div className="flex items-center gap-3"><Clock className="size-5 text-[var(--gold)]" />{SITE.hours}</div>
            </div>
            <a href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest-gradient text-[var(--parchment)] px-5 py-3 font-medium">
              <MessageCircle className="size-4" /> Chat on WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 space-y-5">
            <h2 className="font-display text-3xl">Book an appointment</h2>

            <p className="rounded-2xl border border-[var(--gold)]/30 bg-[var(--cream)] px-4 py-3 text-sm text-[var(--forest-deep)] leading-relaxed">
              Kindly call first to check the availability and then come.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name?.message}>
                <input {...register("name")} className={inputCls} />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register("phone")} className={inputCls} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Age" error={errors.age?.message}>
                <input type="number" min={1} max={120} {...register("age")} className={inputCls} />
              </Field>
              <Field label="Email (optional)" error={errors.email?.message}>
                <input type="email" {...register("email")} className={inputCls} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Treatment" error={errors.treatment?.message}>
                <select {...register("treatment")} className={inputCls}>
                  <option value="">Select a treatment</option>
                  {TREATMENTS.map((t) => (
                    <option key={t.slug} value={t.slug}>{t.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred date" error={errors.preferredDate?.message}>
                <input type="date" {...register("preferredDate")} className={inputCls} />
              </Field>
            </div>

            <Field label="Preferred time" error={errors.preferredTime?.message}>
              <input type="time" {...register("preferredTime")} className={inputCls} />
            </Field>

            <Field label="Anything we should know?">
              <textarea rows={4} {...register("notes")} className={`${inputCls} rounded-3xl`} />
            </Field>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-forest-gradient text-[var(--parchment)] h-12 px-6 text-sm"
            >
              {isSubmitting ? "Sending…" : "Request appointment"}
            </Button>
          </form>
        </Reveal>
      </section>

      <section className="container-page pb-24">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-[var(--border)] aspect-[16/8]">
            <iframe
              title="Devdut clinic location"
              src="https://www.google.com/maps?q=Pune+Maharashtra+India&output=embed"
              className="size-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
