import { motion } from "framer-motion";

export function CompletionImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full aspect-video rounded-lg overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"
        alt="Celebration"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}