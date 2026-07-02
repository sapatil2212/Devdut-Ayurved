import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TREATMENTS } from "@/lib/treatments";
import heroImg from "@/assets/hero-ayurveda.jpg";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Please enter a valid phone"),
  email: z.string().email("Enter a valid email"),
  treatment: z.string().min(1, "Choose a treatment"),
  preferredDate: z.string().min(1, "Pick a date"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  "w-full rounded-full border border-[var(--border)] bg-[var(--parchment)] px-3.5 py-2 text-xs outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30 transition";

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <span className="mt-1 block text-[10px] text-[var(--destructive)]">{error}</span>}
    </label>
  );
}

export function BookAppointmentDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { treatment: "" },
  });

  const onSubmit = async (_: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    setOpen(false);
    reset();
    navigate({ to: "/thank-you" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="grid w-[95vw] max-w-4xl overflow-hidden p-0 border-0 sm:rounded-3xl md:grid-cols-2 bg-[var(--parchment)]">
        {/* Left — image half */}
        <div className="relative hidden md:block">
          <img
            src={heroImg}
            alt=""
            aria-hidden
            className="absolute inset-0 size-full object-cover"
          />
        </div>

        {/* Right — form half */}
        <div className="max-h-[90vh] overflow-y-auto p-5 md:p-6">
          <DialogTitle className="font-display text-xl md:text-2xl text-[var(--forest-deep)]">
            Book an appointment
          </DialogTitle>
          <DialogDescription className="sr-only">Appointment booking form</DialogDescription>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Full name" error={errors.name?.message}>
                <input {...register("name")} className={inputCls} />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register("phone")} className={inputCls} />
              </Field>
            </div>

            <Field label="Email" error={errors.email?.message}>
              <input type="email" {...register("email")} className={inputCls} />
            </Field>

            <div className="grid gap-3 sm:grid-cols-2">
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

            <Field label="Anything we should know?">
              <textarea rows={2} {...register("notes")} className={`${inputCls} rounded-2xl`} />
            </Field>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-forest-gradient text-[var(--parchment)] h-10 text-sm shadow-gold"
            >
              {isSubmitting ? "Sending…" : "Request appointment"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
