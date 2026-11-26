export interface SwCourseMeta {
  titleSw: string;
  summarySw: string;
  termSw: string;
}

export const SW_COURSES_MAP: Record<string, SwCourseMeta> = {
  z5007: {
    titleSw: 'Utayarishaji Programu na Miundo ya Data',
    summarySw:
      'Kozi ya msingi ya MTech inayofundisha ugumu wa algoriti, miundo ya data (mrundiko, miti sawia, grafu, jedwali za hashi), utafutaji wa njia fupi, na utayarishaji wa mifumo ya sayansi ya data kwa Python.',
    termSw: 'Muhula wa Kwanza 2026-27 · Okt 2026 - Jan 2027'
  },
  z3003: {
    titleSw: 'Uchimbaji wa Data Kubwa',
    summarySw:
      'Kozi ya msingi inayofundisha uchimbaji wa mifumo ya takwimu, MapReduce, PySpark, Locality-Sensitive Hashing (LSH), kanuni za Apriori (Sehemu ya 1), pamoja na ugawaji makundi, PageRank na mifumo ya mapendekezo (Sehemu ya 2).',
    termSw: 'Muhula wa Kwanza 2026-27 · Sep 2026 - Jan 2027'
  },
  z2005: {
    titleSw: 'Utayarishaji Programu na Miundo ya Data',
    summarySw:
      'Seti ya kumbukumbu ya mtaala wa BS unaofundishwa kampasini na wahadhiri wenzetu muhula wa 2026-27, yenye slaidi za mihadhara, laha za maabara, na madaftari ya Python/Colab ya uchanganuzi wa algoriti, grafu, na upangaji.',
    termSw: 'Kumbukumbu ya Rejea · Muhula wa Kwanza (BS 2026-27)'
  },
  z2004: {
    titleSw: 'Mifumo ya Usimamizi wa Hifadhidata (DBMS)',
    summarySw:
      'Nyenzo za kumbukumbu zinazohusu uundaji wa mifumo ya ER, aljebra ya uhusiano, SQL, urekebishaji wa data (BCNF), miamala ya ACID, na hifadhidata za NoSQL/vekta.',
    termSw: 'Muhula wa Pili 2025-26 · Mac - Jul 2026'
  },
  z5008: {
    titleSw: 'Maabara ya Data Kubwa (Big Data Lab)',
    summarySw:
      'Nyenzo za maabara zinazofundisha Apache Spark, Delta Lake, Apache Iceberg, Airflow, utiririshaji wa Kafka, MLlib, MLflow, na ufuatiliaji wa mifumo ya data kubwa.',
    termSw: 'Muhula wa Pili 2025-26 · Mac - Jul 2026'
  }
};
