// Ders ve alt konu yapılarını tanımlayan model
export class AltKonu {
  constructor(id, baslik, videoId, tamamlandi = false, aciklama) {
    this.id = id;
    this.baslik = baslik;
    this.videoId = videoId;
    this.tamamlandi = tamamlandi;
    this.aciklama = aciklama;
  }
}

export class Ders {
  constructor(id, baslik, color, bgColor, altKonular = []) {
    this.id = id;
    this.baslik = baslik;
    this.color = color;
    this.bgColor = bgColor;
    this.altKonular = altKonular;
  }
}
