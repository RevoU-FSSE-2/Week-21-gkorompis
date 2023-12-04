from flask import jsonify

jobs_collection = [
    {
        '_id': '656030f476bd5546952b0777',
        'createdBy': 'admins',
        'job': 'week 21',
        'jobProgress': 'working',
        'permission': ['admin'],
        'createdAt': "2023-11-24T05:13:24.994Z"
    },
    {
        '_id': '656030f476bd5546952b0777',
        'createdBy': 'members',
        'job': 'week 21',
        'jobProgress': 'working',
        'permission': ['admin', 'member'],
        'createdAt': "2023-11-24T05:13:24.994Z"
    }
]

def get_jobs():
    return jsonify(jobs_collection)