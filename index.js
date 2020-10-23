const fs = require('fs');
// const csv = require('csv-parser');
const csv = require('fast-csv');

// const clubToIndexMap = {};

// const initialRow = {
//   name: '',
//   mp: 0,
//   gf: 0,
//   ga: 0,
//   gd: 0,
//   w: 0,
//   d: 0,
//   l: 0,
//   p: 0,
// };

// const table = [];

// const stream = fs.createReadStream('./SP1.csv').pipe(csv());
// stream
//   .on('data', (row) => {
//     const homeTeam = row.HomeTeam;
//     const awayTeam = row.AwayTeam;
//     const team = [homeTeam, awayTeam];
//     if (homeTeam && awayTeam) {
//       team.map((currTeam) => {
//         if (clubToIndexMap[`${currTeam}`] === undefined) {
//           table.push({
//             ...initialRow,
//             name: currTeam,
//           });
//           clubToIndexMap[`${currTeam}`] = table.length - 1;
//         }
//       });
//       const homeRow = table[clubToIndexMap[`${homeTeam}`]];
//       const awayRow = table[clubToIndexMap[`${awayTeam}`]];
//       const hG = Number(row['FTHG']);
//       const aG = Number(row['FTAG']);
//       homeRow.mp++;
//       awayRow.mp++;
//       homeRow.gf += hG;
//       homeRow.ga += aG;
//       homeRow.gd = homeRow.gf - homeRow.ga;
//       awayRow.ga += hG;
//       awayRow.gf += aG;
//       awayRow.gd = awayRow.gf - awayRow.ga;
//       if (row['FTR'] === 'H') {
//         homeRow.w++;
//         homeRow.p += 3;
//         awayRow.l++;
//       } else if (row['FTR'] === 'A') {
//         awayRow.w++;
//         awayRow.p += 3;
//         homeRow.l++;
//       } else {
//         homeRow.d++;
//         homeRow.p++;
//         awayRow.d++;
//         awayRow.p++;
//       }
//     }
//   })
//   .on('end', () => {
//     table.sort((a, b) => {
//       if (a.p > b.p) {
//         return -1;
//       } else if (a.p < b.p) {
//         return 1;
//       } else {
//         if (a.gd > b.gd) {
//           return -1;
//         } else if (b.gd > a.gd) {
//           return 1;
//         } else {
//           if (a.gf > b.gf) {
//             return -1;
//           } else if (a.gf < b.gf) {
//             return 1;
//           } else {
//             return a.name.localeCompare(b.name);
//           }
//         }
//       }
//     });
//     const end = new Date() - start;
//     console.log(`Execution time: ${end} ms`);
//     const ws = fs.createWriteStream(`./${process.stdin.fileName}.csv`);
//     fastcsv.write(table, { headers: true }).pipe(ws);
//     console.log(table);
//   });

const headers = [
  'Div',
  'Date',
  'Time',
  'HomeTeam',
  'AwayTeam',
  'FTHG',
  'FTAG',
  'FTR',
  'HTHG',
  'HTAG',
  'HTR',
  'Referee',
  'HS',
  'AS',
  'HST',
  'AST',
  'HF',
  'AF',
  'HC',
  'AC',
  'HY',
  'AY',
  'HR',
  'AR',
];

const rowFormat = {
  Div: '',
  Date: '',
  Time: '',
  HomeTeam: '',
  AwayTeam: '',
  FTHG: '',
  FTAG: '',
  FTR: '',
  HTHG: '',
  HTAG: '',
  HTR: '',
  Referee: '',
  HS: '',
  AS: '',
  HST: '',
  AST: '',
  HF: '',
  AF: '',
  HC: '',
  AC: '',
  HY: '',
  AY: '',
  HR: '',
  AR: '',
};

const stream = process.stdin;

const season = process.argv[2];

const rows = [];

csv
  .parseStream(stream, {
    headers: true,
    ignoreEmpty: true,
    discardUnmappedColumns: true,
  })
  .on('data', (row) => {
    rows.push({ ...rowFormat, ...row });
  })
  .on('end', () => {
    const ws = fs.createWriteStream(`./matches/${season}.csv`, { flags: 'a' });
    csv
      .writeToStream(ws, rows, { headers, writeHeaders: false })
      .on('error', (error) => {
        console.error(error);
      })
      .on('finish', () => {
        fs.appendFileSync(`./matches/${season}.csv`, '\n');
      });
  });
