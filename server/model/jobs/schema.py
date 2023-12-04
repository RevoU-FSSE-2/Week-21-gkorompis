from datetime import datetime
from bson import ObjectId
from typing import List

class Job:
    def __init__(self, created_by:str, job:str, job_progress:str, permission: List[str]):
        self._id = str(ObjectId())
        self.createdBy = created_by,
        self.job = job
        self.jobProgress = job_progress
        self.permission = permission
        self.createdAt = datetime.utcnow().replace(microsecond=0).isoformat() + "Z"
    
    def to_dict(self) -> dict:
        return {
            '_id': self._id,
            'createdBy': self.createdBy,
            'job': self.job,
            'jobProgress': self.jobProgress,
            'permission': self.permission,
            'createdAt': self.createdAt
        }

