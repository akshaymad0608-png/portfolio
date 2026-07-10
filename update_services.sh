#!/bin/bash
sed -i "1i import TiltCard from './ui/TiltCard';" components/Services.tsx
sed -i 's/<motion.div/<TiltCard><motion.div/g' components/Services.tsx
sed -i 's/<\/motion.div>/<\/motion.div><\/TiltCard>/g' components/Services.tsx
