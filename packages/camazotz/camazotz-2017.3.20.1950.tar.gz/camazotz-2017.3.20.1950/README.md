# camazotz

C code in Python code

# introduction

Camazotz compiles and loads C code in Python code. Specifically, it enables insertion of C code directly into Python files, which can be dynamically linked and called via ctypes.

# setup

```Bash
pip install camazotz
```

# usage


```Bash
export CC="gcc"
```

```Python
import camazotz

library = camazotz.C(
    """
    #include <stdio.h>
    
    int factorial(int x){
        int result = 1;
        while (x > 1){
            result *= x;
            x--;
        }
    
        return result;
    }
    """
)

function_factorial = library["factorial"]
print("5! =", function_factorial(5))
print("4! =", function_factorial(4))
```
