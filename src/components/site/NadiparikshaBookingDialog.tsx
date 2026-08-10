import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Sparkles, IndianRupee, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { APPOINTMENT_TIME_SLOTS, SITE } from "@/lib/site";
import phonpeScanner from "@/assets/scanner/phonpe-scanner.jpeg";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Please enter a valid phone"),
  email: z
    .string()
    .optional()
    .refine((v) => !v || z.string().email().safeParse(v).success, "Enter a valid email"),
  age: z.string().min(1, "Please enter your age"),
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

export function NadiparikshaBookingDialog({
  trigger,
  open: controlledOpen,
  onOpenChange,
}: {
  trigger?: ReactNode;
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
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", preferredTime: "" },
  });

  const onSubmit = async (_: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="grid w-[95vw] max-w-3xl gap-0 overflow-hidden p-0 border-0 rounded-2xl sm:rounded-3xl md:grid-cols-[1fr_1.3fr] bg-[var(--parchment)]">

        {/* LEFT — Offer panel with QR */}
        <div className="relative flex flex-col bg-forest-gradient text-[var(--parchment)] p-6 md:p-8 gap-5 justify-between">
          {/* Decorative ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-[var(--gold)]/15"
          />

          <div className="relative z-10 space-y-4">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--forest-deep)]">
              <Sparkles className="size-3" />
              Special Offer
            </span>

            <DialogTitle className="font-display text-2xl md:text-3xl leading-tight text-[var(--parchment)]">
              Free Nadi Pariksha
            </DialogTitle>
            <DialogDescription className="text-[var(--parchment)]/80 text-xs leading-relaxed">
              Pulse diagnosis with Dr. Ganeshkumar Patil (BAMS, M.D.) — available on the{" "}
              <strong className="text-[var(--gold)]">1st &amp; 15th</strong> of every month.
            </DialogDescription>

            {/* Pulsing Fee highlight */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(201, 168, 76, 0.4)",
                  "0 0 0 6px rgba(201, 168, 76, 0)",
                  "0 0 0 0 rgba(201, 168, 76, 0)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl border border-[var(--gold)]/40 bg-[var(--gold)]/15 p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <IndianRupee className="size-4 text-[var(--gold)]" />
                  <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold">
                    Registration Fee
                  </span>
                </div>
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-[var(--gold)]" />
                </span>
              </div>
              <div className="font-display text-4xl font-bold text-[var(--gold)]">
                ₹50
              </div>
              <p className="mt-1.5 text-[10px] text-[var(--parchment)]/75 leading-snug">
                Pay only ₹50 to register and avail your Free Nadi Pariksha session.
              </p>
            </motion.div>

            {/* QR for payment */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center space-y-2">
              <div className="text-[var(--gold)] text-[9px] uppercase tracking-widest">
                Scan &amp; Pay ₹50 Registration
              </div>
              <div className="flex justify-center">
                <div className="rounded-xl bg-white p-2 shadow-lg inline-block">
                  <img
                    src={phonpeScanner}
                    alt="PhonePe QR — Pay ₹50 registration fee"
                    width={120}
                    height={120}
                    className="rounded-lg object-contain block"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="text-[9px] text-[var(--parchment)]/60 leading-snug">
                Scan with PhonePe, GPay, or any UPI app
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — Booking form or Thank you confirmation */}
        <div className="p-4 sm:p-5 flex flex-col justify-center">
          {submitted ? (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3.5 my-auto min-h-[380px]">
              <div className="size-14 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 grid place-items-center text-[var(--gold)] shadow-sm">
                <CheckCircle2 className="size-7" />
              </div>
              <div>
                <div className="font-sanskrit text-base md:text-lg text-[var(--copper)] font-semibold">
                  धन्यवादः
                </div>
                <p className="font-display text-2xl md:text-3xl text-[var(--forest-deep)] mt-1 font-semibold">
                  Thank you.
                </p>
              </div>
              <p className="text-xs md:text-sm text-[var(--muted-foreground)] max-w-sm leading-relaxed">
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
              <div className="mb-3">
                <p className="font-display text-base sm:text-lg text-[var(--forest-deep)] leading-tight font-semibold">
                  Register for Free Nadi Pariksha
                </p>
                <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">
                  Fill in your details and we will confirm your slot.
                </p>
              </div>

              <div className="rounded-lg border border-[var(--gold)]/30 bg-[var(--cream)] px-3 py-2 text-[10px] text-[var(--forest-deep)] leading-snug mb-3">
                Kindly complete the ₹50 payment via the QR and then fill this form to confirm your slot.
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 flex-1">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="Full name" error={errors.name?.message}>
                    <input {...register("name")} className={inputCls} />
                  </Field>
                  <Field label="Phone" error={errors.phone?.message}>
                    <input {...register("phone")} className={inputCls} />
                  </Field>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="Age" error={errors.age?.message}>
                    <input type="number" min={1} max={120} {...register("age")} className={inputCls} />
                  </Field>
                  <Field label="Email (optional)" error={errors.email?.message}>
                    <input type="email" {...register("email")} className={inputCls} />
                  </Field>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="Preferred date (1st or 15th)" error={errors.preferredDate?.message}>
                    <input type="date" {...register("preferredDate")} className={inputCls} />
                  </Field>
                  <Field label="Preferred time" error={errors.preferredTime?.message}>
                    <select {...register("preferredTime")} className={inputCls}>
                      <option value="">Select a time</option>
                      <optgroup label="Morning · 9:00 AM – 2:00 PM">
                        {APPOINTMENT_TIME_SLOTS.filter((s) => s.value <= "14:00").map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Evening · 4:00 PM – 9:00 PM">
                        {APPOINTMENT_TIME_SLOTS.filter((s) => s.value >= "16:00").map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <span className="mt-0.5 block text-[9px] text-[var(--muted-foreground)] leading-tight">
                      {SITE.hours}
                    </span>
                  </Field>
                </div>

                <Field label="Health concern / anything we should know?">
                  <textarea
                    rows={2}
                    {...register("notes")}
                    className={`${inputCls} rounded-xl resize-none`}
                  />
                </Field>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-forest-gradient text-[var(--parchment)] h-9 text-xs shadow-gold mt-1 font-semibold cursor-pointer"
                >
                  {isSubmitting ? "Sending…" : "Confirm Nadipariksha Slot"}
                </Button>

                <p className="text-[9px] text-[var(--muted-foreground)] text-center leading-tight pt-0.5">
                  We confirm every slot personally, within one working day.
                </p>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
