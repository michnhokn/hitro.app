export default class HitroUtils {
    static formatCourseDays(allLectureItems) {
        if (allLectureItems instanceof Array) {
            let lecturesByDay = {};
            allLectureItems.forEach(lecture => {
                let date = lecture.start_date.split('.'),
                    dateKey = date[2] + date[1] + date[0];
                if (!lecturesByDay[dateKey]) {
                    lecturesByDay[dateKey] = {
                        day: lecture.start_mysql,
                        items: []
                    };
                }
                lecturesByDay[dateKey].items.push(lecture);
            });
            return lecturesByDay;
        }
        return null;
    }

    static compareNewCourseDays(oldLecturesByDay, newLecturesByDay) {
        return oldLecturesByDay.map((lecture, index) => {
            if (lecture.lastModified_mysql !== newLecturesByDay[index].lastModified_mysql) {
                let newLecture = lecture;
                newLecture.modified = true;
                return newLecture;
            }
            return lecture;
        });
    }

    static clearModifiedCourseDays(courseDays) {
        return courseDays.map(lecture => {
            delete lecture.modified;
            return lecture;
        })
    }
}