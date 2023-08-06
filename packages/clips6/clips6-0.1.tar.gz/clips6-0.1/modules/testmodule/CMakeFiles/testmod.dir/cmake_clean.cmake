FILE(REMOVE_RECURSE
  "testmod.c"
  "CMakeFiles/testmod.dir/testmod.c.o"
  "testmod.pdb"
  "testmod.so"
)

# Per-language clean rules from dependency scanning.
FOREACH(lang C)
  INCLUDE(CMakeFiles/testmod.dir/cmake_clean_${lang}.cmake OPTIONAL)
ENDFOREACH(lang)
