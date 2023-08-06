FILE(REMOVE_RECURSE
  "dummy_package.c"
  "CMakeFiles/dummy_package.dir/dummy_package.c.o"
  "dummy_package.pdb"
  "dummy_package.so"
)

# Per-language clean rules from dependency scanning.
FOREACH(lang C)
  INCLUDE(CMakeFiles/dummy_package.dir/cmake_clean_${lang}.cmake OPTIONAL)
ENDFOREACH(lang)
