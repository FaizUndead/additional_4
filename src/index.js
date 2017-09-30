module.exports = function multiply(first, second) {
    BigNumber = function(n, p, r){
        var o = this, i;
        if(n instanceof BigNumber){
            for(i in {precision: 0, roundType: 0, _s: 0, _f: 0}) o[i] = n[i];
            o._d = n._d.slice();
            return;
        }
        o.precision = isNaN(p = Math.abs(p)) ? BigNumber.defaultPrecision : p;
        o.roundType = isNaN(r = Math.abs(r)) ? BigNumber.defaultRoundType : r;
        o._s = (n += "").charAt(0) == "-";
        o._f = ((n = n.replace(/[^\d.]/g, "").split(".", 2))[0] = n[0].replace(/^0+/, "") || "0").length;
        for(i = (n = o._d = (n.join("") || "0").split("")).length; i; n[--i] = +n[i]);
        o.round();
    };
    var BigNumberProt = BigNumber.prototype;


        BigNumber.ROUND_HALF_EVEN = (BigNumber.ROUND_HALF_DOWN = (BigNumber.ROUND_HALF_UP = (BigNumber.ROUND_FLOOR = (BigNumber.ROUND_CEIL = (BigNumber.ROUND_DOWN = (BigNumber.ROUND_UP = 0) + 1) + 1) + 1) + 1) + 1) + 1;
        BigNumber.defaultPrecision = 40;
        BigNumber.defaultRoundType = BigNumber.ROUND_HALF_UP;
        BigNumberProt.add = function(n){
            if(this._s != (n = new BigNumber(n))._s)
                return n._s ^= 1, this.subtract(n);
            var o = new BigNumber(this), a = o._d, b = n._d, la = o._f,
                lb = n._f, n = Math.max(la, lb), i, r;
            la != lb && ((lb = la - lb) > 0 ? o._zeroes(b, lb, 1) : o._zeroes(a, -lb, 1));
            i = (la = a.length) == (lb = b.length) ? a.length : ((lb = la - lb) > 0 ? o._zeroes(b, lb) : o._zeroes(a, -lb)).length;
            for(r = 0; i; r = (a[--i] = a[i] + b[i] + r) / 10 >>> 0, a[i] %= 10);
            return r && ++n && a.unshift(r), o._f = n, o.round();
        };

        BigNumberProt.multiply = function(n){
            var o = new BigNumber(this), r = o._d.length >= (n = new BigNumber(n))._d.length, a = (r ? o : n)._d,
                b = (r ? n : o)._d, la = a.length, lb = b.length, x = new BigNumber, i, j, s;
            for(i = lb; i; r && s.unshift(r), x.set(x.add(new BigNumber(s.join("")))))
                for(s = (new Array(lb - --i)).join("0").split(""), r = 0, j = la; j; r += a[--j] * b[i], s.unshift(r % 10), r = (r / 10) >>> 0);
            return o._s = o._s != n._s, o._f = ((r = la + lb - o._f - n._f) >= (j = (o._d = x._d).length) ? this._zeroes(o._d, r - j + 1, 1).length : j) - r, o.round();
        };

        BigNumberProt.set = function(n){
            return this.constructor(n), this;
        };

        BigNumberProt.valueOf = BigNumberProt.toString = function(){
            var o = this;
            return (o._s ? "-" : "") + (o._d.slice(0, o._f).join("") || "0") + (o._f != o._d.length ? "." + o._d.slice(o._f).join("") : "");
        };
        BigNumberProt._zeroes = function(n, l, t){
            var s = ["push", "unshift"][t || 0];
            for(++l; --l;  n[s](0));
            return n;
        };
        BigNumberProt.round = function(){
            if("_rounding" in this) return this;
            var $ = BigNumber, r = this.roundType, b = this._d, d, p, n, x;
            for(this._rounding = true; this._f > 1 && !b[0]; --this._f, b.shift());
            for(d = this._f, p = this.precision + d, n = b[p]; b.length > d && !b[b.length -1]; b.pop());
            x = (this._s ? "-" : "") + (p - d ? "0." + this._zeroes([], p - d - 1).join("") : "") + 1;
            if(b.length > p){
                n && (r == $.DOWN ? false : r == $.UP ? true : r == $.CEIL ? !this._s
                    : r == $.FLOOR ? this._s : r == $.HALF_UP ? n >= 5 : r == $.HALF_DOWN ? n > 5
                        : r == $.HALF_EVEN ? n >= 5 && b[p - 1] & 1 : false) && this.add(x);
                b.splice(p, b.length - p);
            }
            return delete this._rounding, this;
        };


    var f = new BigNumber(first);
    var s = new BigNumber(second);
    var ans = f.multiply(s);
    return ans.toString();

}


