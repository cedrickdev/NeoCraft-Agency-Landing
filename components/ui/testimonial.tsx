import { cn } from "@/lib/utils"
import { motion, PanInfo } from "framer-motion"
import * as React from "react"

interface Testimonial {
  id: number | string
  name: string
  avatar: string
  description: string
}

interface TestimonialCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  showArrows?: boolean
  showDots?: boolean
}

const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(
  (
    { className, testimonials, showArrows = true, showDots = true, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length)
          setExitX(0)
        }, 200)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "h-80 w-full flex items-center justify-center",
          className
        )}
        {...props}
      >
        <div className="relative w-80 h-72">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard =
              index === (currentIndex + 1) % testimonials.length
            const isNextCard =
              index === (currentIndex + 2) % testimonials.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing p-1",
                  "bg-gradient-to-br from-primary/10 via-transparent to-primary/5",
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <div className="w-full h-full bg-card rounded-[calc(1rem-2px)] shadow-xl p-6 flex flex-col items-center gap-4 border border-primary/5">
                  {showArrows && isCurrentCard && (
                    <div className="absolute inset-x-0 top-1.5 flex justify-between px-6">
                      <span className="text-xl select-none cursor-pointer text-primary/20 hover:text-primary transition-colors">
                        &larr;
                      </span>
                      <span className="text-xl select-none cursor-pointer text-primary/20 hover:text-primary transition-colors">
                        &rarr;
                      </span>
                    </div>
                  )}

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/5 shadow-lg"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-black tracking-tight mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest mb-4">
                      Client Verifié
                    </p>
                    <p className="text-center text-sm text-muted-foreground leading-relaxed line-clamp-3 italic">
                      &quot;{testimonial.description}&quot;
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
          {showDots && (
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-primary w-4"
                      : "bg-primary/20",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel, type Testimonial }
