import logging


class WorkerDao(object):
  logger = logging.getLogger(__name__)

  def __init__(self, redis_server):
    self.redis_server = redis_server

  def save(self, id, worker):
    jobs = dict(worker)
    if len(worker["jobs"]) > 0:
      jobs["jobs"] = ",".join(worker["jobs"])
    else:
      jobs.pop("jobs", None)
    self.redis_server.hmset(id, jobs)

  def get(self, key):
    if not key:
      raise Exception('id must be set')
    worker = self.redis_server.hgetall(key)
    self.logger.info("worker:: {}".format(worker))
    if not worker:
      worker = {"key": key}
    if "jobs" in worker:
      worker["jobs"] = worker["jobs"].split(",")
    else:
      worker["jobs"] = []

    return worker
