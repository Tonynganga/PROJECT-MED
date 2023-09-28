from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import schedule_job

def start():
    scheduler=BackgroundScheduler()
    scheduler.add_job(schedule_job,'interval',seconds=10)
    scheduler.start()