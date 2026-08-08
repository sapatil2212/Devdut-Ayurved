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
  "w-full rounded-full border border-[var(--border)] bg-[var(--parchment)] px-3 py-1.5 text-[11px] md:px-3.5 md:py-2 md:text-xs outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30 transition";

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">{label}</span>
      <div className="mt-0.5 md:mt-1">{children}</div>
      {error && <span className="mt-0.5 block text-[9px] md:text-[10px] text-[var(--destructive)]">{error}</span>}
    </label>
  );
}

export function BookAppointmentDialog({ trigger, onOpen }: { trigger: ReactNode; onOpen?: () => void }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (val && onOpen) {
      setTimeout(onOpen, 50);
    }
  };
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
    setOpen(false);
    reset();
    navigate({ to: "/thank-you" });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="grid w-[92vw] max-w-4xl overflow-hidden p-0 border-0 rounded-2xl sm:rounded-3xl md:grid-cols-2 bg-[var(--parchment)]">
        <div className="relative hidden md:block">
          <img
            src={heroImg}
            alt=""
            aria-hidden
            className="absolute inset-0 size-full object-cover"
          />
        </div>

        <div className="max-h-[85vh] overflow-y-auto p-4 md:p-6">
          <DialogTitle className="font-display text-lg md:text-2xl text-[var(--forest-deep)]">
            Book an appointment
          </DialogTitle>
          <DialogDescription className="sr-only">Appointment booking form</DialogDescription>

          <p className="mt-2 mb-3 rounded-xl border border-[var(--gold)]/30 bg-[var(--cream)] px-3 py-2 text-[10px] md:text-xs text-[var(--forest-deep)] leading-relaxed">
            Kindly call first to check availability, then come for your visit.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-1 space-y-2.5 md:space-y-3">
            <div className="grid gap-2 sm:grid-cols-2 md:gap-3">
              <Field label="Full name" error={errors.name?.message}>
                <input {...register("name")} className={inputCls} />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register("phone")} className={inputCls} />
              </Field>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 md:gap-3">
              <Field label="Age" error={errors.age?.message}>
                <input type="number" min={1} max={120} {...register("age")} className={inputCls} />
              </Field>
              <Field label="Email (optional)" error={errors.email?.message}>
                <input type="email" {...register("email")} className={inputCls} />
              </Field>
            </div>

            <Field label="Treatment" error={errors.treatment?.message}>
              <select {...register("treatment")} className={inputCls}>
                <option value="">Select a treatment</option>
                {TREATMENTS.map((t) => (
                  <option key={t.slug} value={t.slug}>{t.name}</option>
                ))}
              </select>
            </Field>

            <div className="grid gap-2 sm:grid-cols-2 md:gap-3">
              <Field label="Preferred date" error={errors.preferredDate?.message}>
                <input type="date" {...register("preferredDate")} className={inputCls} />
              </Field>
              <Field label="Preferred time" error={errors.preferredTime?.message}>
                <input type="time" {...register("preferredTime")} className={inputCls} />
              </Field>
            </div>

            <Field label="Anything we should know?">
              <textarea rows={2} {...register("notes")} className={`${inputCls} rounded-xl md:rounded-2xl`} />
            </Field>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-forest-gradient text-[var(--parchment)] h-8 md:h-10 text-xs md:text-sm shadow-gold"
            >
              {isSubmitting ? "Sending…" : "Request appointment"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
