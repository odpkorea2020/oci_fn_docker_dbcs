const oracledb = require('oracledb');
const dbConfig = require('./dbconfig');
const { Observable } = require('rxjs');
const ctxFunc = require('./ctxFunc');


function run(input, ctx) {

    const result = {};
    result.input = input;
    
    result.ctx = ctx["_headers"];
    // result.pathParam = ctxFunc.run(ctx);

    const subscriberFunc = async function (observer) {
        let dbPool;
        try {
            if (!dbPool) {
                dbPool = await oracledb.createPool({
                    user: dbConfig.user,
                    password: dbConfig.password,
                    connectString: dbConfig.connectString,
                });
            }

            let connection;
            try {
                const chart_date = input.path;
                const connection = await dbPool.getConnection();
                const db_result = await connection.execute(
                    `SELECT chart_rank, song, artist FROM rank100 where chart_date = :chart_date order by 1`,
                    [chart_date],
                );
                console.log("result is: ", db_result);
                observer.next(db_result.rows);

            } catch (err) {
                observer.error(err);
                // throw (err);
            } finally {

                if (connection) {
                    try {
                        await connection.close();
                    } catch (err) {
                        // throw (err);
                        console.error(err);
                    }
                }

            }

        } catch (err) {
            console.error(err.message);

        } finally {
            // if(dbPool) {
            //     await dbPool.close();
            // }
            observer.complete();
        }

    };


    return new Promise(function (resolve, reject) {
        const observable = new Observable(subscriberFunc);

        const nextFunc = function (value) {
            result.data = value;
            // console.log(result);
        }

        const errorFunc = function (e) {
            console.error(e);
            reject(e);
        }

        const completeFunc = function () {
            // console.log('complete');
            // return result;
            resolve(result);
        }
        observable.subscribe(nextFunc, errorFunc, completeFunc);
    });
}
// observable.subscribe(nextFunc, errorFunc, completeFunc);


module.exports.run = run;

// export default DbFuncRxjs;
// module.exports = DbFuncRxjs;