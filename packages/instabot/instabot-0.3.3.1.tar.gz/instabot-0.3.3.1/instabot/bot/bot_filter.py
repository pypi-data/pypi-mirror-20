"""
    Work with
        whitelist, blacklist,
        seleb account,
"""

import os
import io

def check_if_file_exists(file_path):
    if not os.path.exists(file_path):
        print ("Can't find '%s' file." % file_path)
        return False
    return True

def read_list_from_file(file_path):
    """
        Reads list from file. One line - one item.
        Returns the list if file items.
    """
    try:
        if not check_if_file_exists(file_path):
            return False
        with io.open(file_path, "r", encoding="utf8") as f:
            content = f.readlines()
            content = [str(item.strip()) for item in content if len(item.strip()) > 0]
            return content
    except:
        return False

def add_whitelist(self, file_path):
    file_contents = read_list_from_file(file_path)
    self.whitelist = [convert_to_user_id(item) for item in file_contents]
    return not not self.whitelist

def add_blacklist(self, file_path):
    file_contents = read_list_from_file(file_path)
    self.blacklist = [convert_to_user_id(item) for item in file_contents]
    return not not self.blacklist

def get_media_owner(self, media_id):
    self.mediaInfo(media_id)
    try:
        return self.LastJson["items"][0]["user"]["pk"]
    except:
        return False

def check_media(self, media_id):
    return check_user(self, get_media_owner(self, media_id))

def check_user(self, user_id):
    """
        Decide should you interract with that user_id or not.
        Decision based on
            1) Following/followers ratio
            2) Approved account
            3) Black-whitelist
            4) Closed accs
    """
    if not user_id:
        return True
    if self.whitelist:
        if user_id in self.whitelist:
            return True
    if self.blacklist:
        if user_id in self.blacklist:
            return False

    user_info = self.get_user_info(user_id)
    if not user_info:
        return True # closed acc
    if "is_business" in user_info:
        if user_info["is_business"]:
            return False
    if "is_verified" in user_info:
        if user_info["is_verified"]:
            return False
    if "follower_count" in user_info and "following_count" in user_info:
        if user_info["follower_count"] < 100:
            return True # not famous user
        if user_info["following_count"] < 10:
            return False
        if user_info["follower_count"] / user_info["following_count"] > 10:
            return False # too many
        if user_info["following_count"] / user_info["follower_count"] > 2:
            return True # too many
    if 'media_count' in user_info:
        if user_info["media_count"] < 3:
            return False # bot or inactive user
    return True

def convert_to_user_id(self, smth):
    if type(smth) == str and not smth.isdigit():
        if smth[0] == "@": # cut first @
            smth = smth[1:]
        smth = self.get_userid_from_username(smth)
    # if type is not str than it is int so user_id passed
    return smth
