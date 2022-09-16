import sys
import json
import csv


def main():
    if len(sys.argv) != 2:
        print(
            "Please use properly: python3 staff_onboarding.py <file to read from>"
        )
        return -1
    pic_file = open(
        '../frontend/src/assets/staff_pictures/staff_picturesFA22/file_names.txt'
    )
    pic_file = pic_file.readlines()
    in_file = open(sys.argv[1], 'r')
    staff_info = list(csv.reader(in_file))[1:]
    staff_list = []
    for name, _, bio, interests, languages in staff_info:
        staff = {}
        staff['name'] = name
        staff['bio'] = bio
        staff['languages'] = languages
        staff['technical_areas'] = interests
        for f in pic_file:
            if f[:len(name)] == name:
                staff['picture'] = f.strip('\n')
                break
        staff_list.append(staff)
    out_file = open('../frontend/src/assets/staff.json', 'w')
    out_file.write(json.dumps(staff_list, indent=4))


if __name__ == "__main__":
    main()