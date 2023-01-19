"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abbreviate = void 0;
const abbreviate = (number, decPlaces) => {
    decPlaces = Math.pow(10, decPlaces);
    const abbrev = ['k', 'm', 'b', 't'];
    for (let i = abbrev.length - 1; i >= 0; i--) {
        const size = Math.pow(10, (i + 1) * 3);
        if (size <= number) {
            number = Math.round((number * decPlaces) / size) / decPlaces;
            if (number == 1000 && i < abbrev.length - 1) {
                number = 1;
                i++;
            }
            number += abbrev[i];
            break;
        }
    }
    return number;
};
exports.abbreviate = abbreviate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJicmV2aWF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2FiYnJldmlhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFjLEVBQUUsU0FBaUIsRUFBRSxFQUFFO0lBQzVELFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUVwQyxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRXBDLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMzQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN0QyxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDbEIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBRTdELElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQyxFQUFFLENBQUM7YUFDTDtZQUVBLE1BQTRCLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNDLE1BQU07U0FDUDtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFBO0FBdEJVLFFBQUEsVUFBVSxjQXNCcEIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYWJicmV2aWF0ZSA9IChudW1iZXI6IG51bWJlciwgZGVjUGxhY2VzOiBudW1iZXIpID0+IHtcclxuICAgIGRlY1BsYWNlcyA9IE1hdGgucG93KDEwLCBkZWNQbGFjZXMpO1xyXG4gIFxyXG4gICAgY29uc3QgYWJicmV2ID0gWydrJywgJ20nLCAnYicsICd0J107XHJcbiAgXHJcbiAgICBmb3IgKGxldCBpID0gYWJicmV2Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGNvbnN0IHNpemUgPSBNYXRoLnBvdygxMCwgKGkgKyAxKSAqIDMpXHJcbiAgICAgIGlmIChzaXplIDw9IG51bWJlcikge1xyXG4gICAgICAgIG51bWJlciA9IE1hdGgucm91bmQoKG51bWJlciAqIGRlY1BsYWNlcykgLyBzaXplKSAvIGRlY1BsYWNlcztcclxuICBcclxuICAgICAgICBpZiAobnVtYmVyID09IDEwMDAgJiYgaSA8IGFiYnJldi5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICBudW1iZXIgPSAxO1xyXG4gICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICAobnVtYmVyIGFzIHVua25vd24gYXMgc3RyaW5nKSArPSBhYmJyZXZbaV07XHJcbiAgXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIHJldHVybiBudW1iZXI7XHJcbiAgfSJdfQ==