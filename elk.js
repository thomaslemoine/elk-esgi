'use strict'

require('array.prototype.flatmap').shim()
const {Client} = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200'
})
const fs = require('fs');


async function run() {
    await client.indices.create({
        index: 'groupe8',
        body: {
            mappings: {
                properties: {
                    title: {type: 'text'},
                    seo_title: {type: 'text'},
                    url: {type: 'text'},
                    author: {type: 'text'},
                    category: {type: 'text'},
                    locales: {type: 'text'},
                    content: {type: 'text'},
                    date: {type: 'text'}
                }
            }
        }
    }, {ignore: [400]})
    fs.readFile('groupe8.json', async (err, data) => {
        if (err) throw err;
        let dataset = JSON.parse(data);
        const body = dataset.flatMap(doc => [{index: {_index: 'groupe8'}}, doc])

        const {body: bulkResponse} = await client.bulk({refresh: true, body})

        if (bulkResponse.errors) {
            const erroredDocuments = []
            bulkResponse.items.forEach((action, i) => {
                const operation = Object.keys(action)[0]
                if (action[operation].error) {
                    erroredDocuments.push({
                        status: action[operation].status,
                        error: action[operation].error,
                        operation: body[i * 2],
                        document: body[i * 2 + 1]
                    })
                }
            })
            console.log(erroredDocuments)
        }

        const {body: count} = await client.count({index: 'groupe8'})
        console.log(count)
    });

}

run().catch(console.log)