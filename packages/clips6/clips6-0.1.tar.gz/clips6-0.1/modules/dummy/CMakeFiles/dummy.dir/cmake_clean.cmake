FILE(REMOVE_RECURSE
  "dummy.c"
  "CMakeFiles/dummy.dir/dummy.c.o"
  "dummy.pdb"
  "dummy.so"
)

# Per-language clean rules from dependency scanning.
FOREACH(lang C)
  INCLUDE(CMakeFiles/dummy.dir/cmake_clean_${lang}.cmake OPTIONAL)
ENDFOREACH(lang)
