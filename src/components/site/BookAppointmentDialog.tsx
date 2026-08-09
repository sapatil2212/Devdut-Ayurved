import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TREATMENTS } from "@/lib/treatments";
import { APPOINTMENT_TIME_SLOTS, SITE } from "@/lib/site";
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
  "w-full rounded-full border border-[var(--border)] bg-[var(--parchment)] px-3 py-1.5 text-[11px] outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30 transition";

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[9px] uppercase tracking-widest text-[var(--muted-foreground)] leading-none">{label}</span>
      <div className="mt-0.5">{children}</div>
      {error && <span className="mt-0.5 block text-[9px] text-[var(--destructive)] leading-none">{error}</span>}
    </label>
  );
}

export function BookAppointmentDialog({
  trigger,
  onOpen,
  open: controlledOpen,
  onOpenChange,
}: {
  trigger?: ReactNode;
  onOpen?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const navigate = useNavigate();

  const handleOpenChange = (val: boolean) => {
    if (onOpenChange) onOpenChange(val);
    else setUncontrolledOpen(val);
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
    defaultValues: { treatment: "", email: "", preferredTime: "" },
  });

  const onSubmit = async (_: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    handleOpenChange(false);
    reset();
    navigate({ to: "/thank-you" });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="grid w-[92vw] max-w-4xl gap-0 overflow-hidden p-0 border-0 rounded-2xl sm:rounded-3xl md:grid-cols-2 bg-[var(--parchment)]">
        <div className="relative hidden md:block self-stretch">
          <img
            src={heroImg}
            alt=""
            aria-hidden
            className="absolute inset-0 size-full object-cover"
          />
        </div>

        <div className="p-3 sm:p-3.5">
          <DialogTitle className="font-display text-base sm:text-lg text-[var(--forest-deep)] leading-tight">
            Book an appointment
          </DialogTitle>
          <DialogDescription className="sr-only">Appointment booking form</DialogDescription>

          <p className="mt-1.5 mb-2 rounded-lg border border-[var(--gold)]/30 bg-[var(--cream)] px-2.5 py-1.5 text-[10px] text-[var(--forest-deep)] leading-snug">
            Kindly call first to check availability, then come for your visit.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-1.5">
            <div className="grid gap-1.5 sm:grid-cols-2">
              <Field label="Full name" error={errors.name?.message}>
                <input {...register("name")} className={inputCls} />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register("phone")} className={inputCls} />
              </Field>
            </div>

            <div className="grid gap-1.5 sm:grid-cols-2">
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

            <div className="grid gap-1.5 sm:grid-cols-2">
              <Field label="Preferred date" error={errors.preferredDate?.message}>
                <input type="date" {...register("preferredDate")} className={inputCls} />
              </Field>
              <Field label="Preferred time" error={errors.preferredTime?.message}>
                <select {...register("preferredTime")} className={inputCls}>
                  <option value="">Select a time</option>
                  <optgroup label="Morning · 9:00 AM – 2:00 PM">
                    {APPOINTMENT_TIME_SLOTS.filter((s) => s.value <= "14:00").map((slot) => (
                      <option key={slot.value} value={slot.value}>{slot.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Evening · 4:00 PM – 9:00 PM">
                    {APPOINTMENT_TIME_SLOTS.filter((s) => s.value >= "16:00").map((slot) => (
                      <option key={slot.value} value={slot.value}>{slot.label}</option>
                    ))}
                  </optgroup>
                </select>
                <span className="mt-0.5 block text-[9px] text-[var(--muted-foreground)] leading-tight">
                  {SITE.hours}
                </span>
              </Field>
            </div>

            <Field label="Anything we should know?">
              <textarea rows={1} {...register("notes")} className={`${inputCls} rounded-xl resize-none`} />
            </Field>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-forest-gradient text-[var(--parchment)] h-8 text-xs shadow-gold mt-0.5"
            >
              {isSubmitting ? "Sending…" : "Request appointment"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
