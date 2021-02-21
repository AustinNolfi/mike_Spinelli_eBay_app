a = "83492325098";
b = new Set("0123456789");
console.log(b);
for (i=0; i<a.length; i++){
    console.log(a[i]);
    console.log(b.has(a[i]));
}