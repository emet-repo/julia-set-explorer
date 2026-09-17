export class Complex {
  constructor(public re: number = 0, public im: number = 0) {}

  copy(): Complex {
    return new Complex(this.re, this.im);
  }

  add(other: Complex): Complex {
    return new Complex(this.re + other.re, this.im + other.im);
  }

  sub(other: Complex): Complex {
    return new Complex(this.re - other.re, this.im - other.im);
  }

  mul(other: Complex): Complex {
    return new Complex(
      this.re * other.re - this.im * other.im,
      this.re * other.im + this.im * other.re
    );
  }

  normSq(): number {
    return this.re * this.re + this.im * this.im;
  }

  abs(): number {
    return Math.hypot(this.re, this.im);
  }

  // Complex square root: sqrt(Z)
  sqrt(): Complex {
    const r = this.abs();
    const u = Math.sqrt(Math.max(0, (r + this.re) / 2));
    let v = Math.sqrt(Math.max(0, (r - this.re) / 2));
    if (this.im < 0) v = -v;
    return new Complex(u, v);
  }
}
