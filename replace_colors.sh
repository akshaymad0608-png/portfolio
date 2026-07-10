#!/bin/bash
find components/ pages/ -type f -name "*.tsx" -exec sed -i \
  -e 's/text-\[#00F5FF\]/text-primary/g' \
  -e 's/bg-\[#00F5FF\]/bg-primary/g' \
  -e 's/border-\[#00F5FF\]/border-primary/g' \
  -e 's/from-\[#00F5FF\]/from-primary/g' \
  -e 's/via-\[#00F5FF\]/via-primary/g' \
  -e 's/to-\[#00F5FF\]/to-primary/g' \
  -e 's/text-\[#7C3AED\]/text-secondary/g' \
  -e 's/bg-\[#7C3AED\]/bg-secondary/g' \
  -e 's/border-\[#7C3AED\]/border-secondary/g' \
  -e 's/from-\[#7C3AED\]/from-secondary/g' \
  -e 's/via-\[#7C3AED\]/via-secondary/g' \
  -e 's/to-\[#7C3AED\]/to-secondary/g' \
  -e 's/text-\[#2563EB\]/text-accent/g' \
  -e 's/bg-\[#2563EB\]/bg-accent/g' \
  -e 's/border-\[#2563EB\]/border-accent/g' \
  -e 's/from-\[#2563EB\]/from-accent/g' \
  -e 's/via-\[#2563EB\]/via-accent/g' \
  -e 's/to-\[#2563EB\]/to-accent/g' \
  -e 's/text-\[#94A3B8\]/text-textSecondary/g' \
  -e 's/bg-\[#030712\]/bg-background/g' \
  -e 's/border-\[#030712\]/border-background/g' \
  -e 's/text-white/text-text/g' \
  -e 's/border-\[rgba(255,255,255,0.1)\]/border-border/g' \
  -e 's/border-\[rgba(255,255,255,0.05)\]/border-border/g' \
  {} +
