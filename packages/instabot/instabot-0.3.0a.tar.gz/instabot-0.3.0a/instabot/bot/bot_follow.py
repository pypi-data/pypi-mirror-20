import time
import random
from tqdm import tqdm

from . import limits

def follow(self, user_id):
    if not self.check_user(user_id):
        return True
    if limits.check_if_bot_can_follow(self):
        if super(self.__class__, self).follow(user_id):
            self.total_followed += 1
            return True
    else:
        self.logger.info("Out of follows for today.")
    return False

def follow_users(self, user_ids):
    self.logger.info("Going to follow %d users." % len(user_ids))
    for user_id in tqdm(user_ids):
        if not self.follow(user_id):
            time.sleep(180)
            while not self.follow(user_id):
                time.sleep(180)
        time.sleep(15 + 30 * random.random())
    self.logger.info("DONE: Total followed %d users." % self.total_followed)
    return True

def follow_followers(self, user_id, nfollows=None):
    self.logger.info("Follow followers of: %s" % user_id)
    follower_ids = self.get_user_followers(user_id)[:nfollows]
    self.follow_users(follower_ids)

def follow_following(self, user_id, nfollows=None):
    self.logger.info("Follow following of: %s" % user_id)
    following_ids = self.get_user_following(user_id)[:nfollows]
    self.follow_users(following_ids)
