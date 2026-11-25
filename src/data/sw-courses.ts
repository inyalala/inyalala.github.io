export interface SwCourseMeta {
  titleSw: string;
  summarySw: string;
  termSw: string;
}

export const SW_COURSES_MAP: Record<string, SwCourseMeta> = {
  z5007: {
    titleSw: 'Utayarishaji Programu na Miundo ya Data (MTech DSAI)',
    summarySw:
      'Kozi ya msingi ya MTech inayofundisha ugumu wa algoriti, miundo ya data (mrundiko, miti sawia, grafu, jedwali za hashi), utafutaji wa njia fupi, na utayarishaji wa mifumo ya sayansi ya data kwa Python.',
    termSw: 'Muhula wa Kwanza 2026-27 · Okt 2026 - Jan 2027'
  },
  z3003: {
    titleSw: 'Uchimbaji wa Data Kubwa (BS Core)',
    summarySw:
      'Kozi ya pamoja (Wiki 1-6 na Dkt. Nyalala; Wiki 7-15 na Dkt. Mahendran V) inayofundisha uchimbaji wa mifumo ya takwimu, MapReduce, PySpark, Locality-Sensitive Hashing (LSH), PageRank, na kanuni za Apriori.',
    termSw: 'Muhula wa Kwanza 2026-27 · Okt 2026 - Jan 2027'
  },
  z2005: {
    titleSw: 'Utayarishaji Programu na Miundo ya Data (BS Rejea)',
    summarySw:
      'Seti ya kumbukumbu yenye slaidi za mihadhara, laha za maabara, na daftari za Python/Colab za uchanganuzi wa algoriti, grafu, na upangaji.',
    termSw: 'Kumbukumbu ya Rejea · Muhula wa Kwanza (BS 2026-27)'
  },
  z2004: {
    titleSw: 'Mifumo ya Usimamizi wa Hifadhidata (DBMS · BS Kumbukumbu)',
    summarySw:
      'Nyenzo za kumbukumbu zinazohusu uundaji wa mifumo ya ER, aljebra ya uhusiano, SQL, urekebishaji wa data (BCNF), miamala ya ACID, na hifadhidata za NoSQL/vekta.',
    termSw: 'Muhula wa Pili 2025-26 · Mac - Jul 2026'
  },
  z5008: {
    titleSw: 'Maabara ya Data Kubwa (Big Data Lab · MTech Kumbukumbu)',
    summarySw:
      'Nyenzo za maabara zinazofundisha Apache Spark, Delta Lake, Apache Iceberg, Airflow, utiririshaji wa Kafka, MLlib, MLflow, na ufuatiliaji wa mifumo ya data kubwa.',
    termSw: 'Muhula wa Pili 2025-26 · Mac - Jul 2026'
  }
};
