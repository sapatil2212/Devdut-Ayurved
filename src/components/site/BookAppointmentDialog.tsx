import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[9px] uppercase tracking-widest text-[var(--muted-foreground)] leading-none">
        {label}
      </span>
      <div className="mt-0.5">{children}</div>
      {error && (
        <span className="mt-0.5 block text-[9px] text-[var(--destructive)] leading-none">
          {error}
        </span>
      )}
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
  const [submitted, setSubmitted] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setTimeout(() => setSubmitted(false), 300);
    }
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
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    reset();
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

        <div className="p-4 sm:p-5 flex flex-col justify-center">
          {submitted ? (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3.5 my-auto min-h-[340px]">
              <div className="size-14 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 grid place-items-center text-[var(--gold)] shadow-sm">
                <CheckCircle2 className="size-7" />
              </div>
              <div>
                <div className="font-sanskrit text-base md:text-lg text-[var(--copper)] font-semibold">
                  धन्यवादः
                </div>
                <DialogTitle className="font-display text-2xl md:text-3xl text-[var(--forest-deep)] mt-1">
                  Thank you.
                </DialogTitle>
              </div>
              <p className="text-xs md:text-sm text-[var(--muted-foreground)] max-w-xs leading-relaxed">
                We have received your request. A member of our team will confirm your appointment personally within one working day.
              </p>
              <Button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="rounded-full bg-forest-gradient text-[var(--parchment)] px-7 h-9 text-xs shadow-gold mt-2 cursor-pointer font-semibold"
              >
                Done
              </Button>
            </div>
          ) : (
            <>
              <DialogTitle className="font-display text-base sm:text-lg text-[var(--forest-deep)] leading-tight">
                Book an appointment
              </DialogTitle>
              <DialogDescription className="sr-only">
                Appointment booking form
              </DialogDescription>

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
                    <input
                      type="number"
                      min={1}
                      max={120}
                      {...register("age")}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email (optional)" error={errors.email?.message}>
                    <input type="email" {...register("email")} className={inputCls} />
                  </Field>
                </div>

                <div className="grid gap-1.5 sm:grid-cols-2">
                  <Field label="Treatment" error={errors.treatment?.message}>
                    <select {...register("treatment")} className={inputCls}>
                      <option value="">Select a treatment</option>
                      {TREATMENTS.map((t) => (
                        <option key={t.slug} value={t.slug}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Preferred date" error={errors.preferredDate?.message}>
                    <input type="date" {...register("preferredDate")} className={inputCls} />
                  </Field>
                </div>

                <div className="grid gap-1.5 sm:grid-cols-2">
                  <Field label="Preferred time" error={errors.preferredTime?.message}>
                    <select {...register("preferredTime")} className={inputCls}>
                      <option value="">Select a time</option>
                      <optgroup label="Morning · 9:00 AM – 2:00 PM">
                        {APPOINTMENT_TIME_SLOTS.filter((s) => s.value <= "14:00").map(
                          (slot) => (
                            <option key={slot.value} value={slot.value}>
                              {slot.label}
                            </option>
                          )
                        )}
                      </optgroup>
                      <optgroup label="Evening · 4:00 PM – 9:00 PM">
                        {APPOINTMENT_TIME_SLOTS.filter((s) => s.value >= "16:00").map(
                          (slot) => (
                            <option key={slot.value} value={slot.value}>
                              {slot.label}
                            </option>
                          )
                        )}
                      </optgroup>
                    </select>
                    <span className="mt-0.5 block text-[9px] text-[var(--muted-foreground)] leading-tight">
                      {SITE.hours}
                    </span>
                  </Field>

                  <Field label="Anything we should know?">
                    <textarea
                      rows={1}
                      {...register("notes")}
                      className={`${inputCls} rounded-xl resize-none`}
                    />
                  </Field>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-forest-gradient text-[var(--parchment)] h-9 text-xs shadow-gold mt-2 font-semibold cursor-pointer"
                >
                  {isSubmitting ? "Sending…" : "Request appointment"}
                </Button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
