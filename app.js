const fs = require('fs');
const path = require('path');


const ignoreted = ['.idea', 'app.js', 'package.json', 'correct_location'];
const pathMaleDir=path.join(__dirname, 'correct_location', '20_00');
const pathFemaleDir=path.join(__dirname, 'correct_location', '18_00');

fs.mkdir(pathFemaleDir, {recursive: true}, err => {
    if (err) {
        console.log(err);
    }
})
fs.mkdir(pathMaleDir, {recursive: true}, err => {
    if (err) {
        console.log(err);
    }
})

function readDirRec(pathDir) {
    fs.readdir(pathDir, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach(fileName => {
            if (pathDir === __dirname) {
                let ign=false;
                for (const ig of ignoreted) {
                    if (fileName === ig) {
                        ign=true;
                        break;
                    }
                }
                if(ign){
                    return;
                }
            }
            const pathFile = path.join(pathDir, fileName);
            fs.stat(pathFile, (err, stats) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (stats.isDirectory()) {
                    readDirRec(pathFile);
                } else {
                    fs.readFile(pathFile, (err, data) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if(data.toString().includes('female')){
                            fs.rename(pathFile, path.join(pathFemaleDir, fileName), err => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }else if(data.toString().includes('male')){
                            fs.rename(pathFile, path.join(pathMaleDir, fileName), err => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    });
                }
            })
        })
    });

}

readDirRec(__dirname);

