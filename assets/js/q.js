function post(url, data={}) {
    return $.ajax({
        type: 'POST',
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

function get(url) {
    return $.ajax({
        type: 'get',
        url,
        contentType: "application/json",
    })
}

function post_formdata(url, data = {}) {
    return $.ajax({
        type: 'post',
        url,
        data: data,
        contentType: "multipart/form-data",
    })
    }
// const __sort = (arr, comparefn) => {
//     let array = Object(arr);
//     let length = array.length >>> 0;
//     return InnerArraySort(array, length, comparefn);
//   }
  
//   const InnerArraySort = (array, length, comparefn) => {
//     // 比较函数未传入
//     if (Object.prototype.toString.call(comparefn) !== "[object Function]") {
//       comparefn = function (x, y) {
//         if (x === y) return 0;
//         x = x.toString();
//         y = y.toString();
//         if (x == y) return 0;
//         else return x < y ? -1 : 1;
//       };
//     }
//     const insertSort = (arr, start = 0, end) => {
//       end = end || arr.length;
//       for (let i = start; i < end; i++) {
//         let e = arr[i];
//         let j;
//         for (j = i; j > start && comparefn(arr[j - 1], e) > 0; j--)
//           arr[j] = arr[j - 1];
//         arr[j] = e;
//       }
//       return;
//     }
//     const getThirdIndex = (a, from, to) => {
//       let tmpArr = [];
//       // 递增量，200~215 之间，因为任何正数和15做与操作，不会超过15，当然是大于0的
//       let increment = 200 + ((to - from) & 15);
//       let j = 0;
//       from += 1;
//       to -= 1;
//       for (let i = from; i < to; i += increment) {
//         tmpArr[j] = [i, a[i]];
//         j++;
//       }
//       // 把临时数组排序，取中间的值，确保哨兵的值接近平均位置
//       tmpArr.sort(function (a, b) {
//         return comparefn(a[1], b[1]);
//       });
//       let thirdIndex = tmpArr[tmpArr.length >> 1][0];
//       return thirdIndex;
//     };
  
//     const _sort = (a, b, c) => {
//       let arr = [];
//       arr.push(a, b, c);
//       insertSort(arr, 0, 3);
//       return arr;
//     }
  
//     const quickSort = (a, from, to) => {
//       //哨兵位置
//       let thirdIndex = 0;
//       while (true) {
//         if (to - from <= 10) {
//           insertSort(a, from, to);
//           return;
//         }
//         if (to - from > 1000) {
//           thirdIndex = getThirdIndex(a, from, to);
//         } else {
//           // 小于1000 直接取中点
//           thirdIndex = from + ((to - from) >> 2);
//         }
//         let tmpArr = _sort(a[from], a[thirdIndex], a[to - 1]);
//         a[from] = tmpArr[0]; a[thirdIndex] = tmpArr[1]; a[to - 1] = tmpArr[2];
//         // 现在正式把 thirdIndex 作为哨兵
//         let pivot = a[thirdIndex];
//         [a[from], a[thirdIndex]] = [a[thirdIndex], a[from]];
//         // 正式进入快排
//         let lowEnd = from + 1;
//         let highStart = to - 1;
//         a[thirdIndex] = a[lowEnd];
//         a[lowEnd] = pivot;
//         // [lowEnd, i)的元素是和pivot相等的
//         // [i, highStart) 的元素是需要处理的
//         for (let i = lowEnd + 1; i < highStart; i++) {
//           let element = a[i];
//           let order = comparefn(element, pivot);
//           if (order < 0) {
//             a[i] = a[lowEnd];
//             a[lowEnd] = element;
//             lowEnd++;
//           } else if (order > 0) {
//             do{
//               highStart--;
//               if (highStart === i) break;
//               order = comparefn(a[highStart], pivot);
//             }while (order > 0) ;
//             // 现在 a[highStart] <= pivot
//             // a[i] > pivot
//             // 两者交换
//             a[i] = a[highStart];
//             a[highStart] = element;
//             if (order < 0) {
//               // a[i] 和 a[lowEnd] 交换
//               element = a[i];
//               a[i] = a[lowEnd];
//               a[lowEnd] = element;
//               lowEnd++;
//             }
//           }
//         }
//         // 永远切分大区间
//         if (lowEnd - from > to - highStart) {
//           // 单独处理小区间
//           quickSort(a, highStart, to);
//           // 继续切分lowEnd ~ from 这个区间
//           to = lowEnd;
//         } else if (lowEnd - from <= to - highStart) {
//           quickSort(a, from, lowEnd);
//           from = highStart;
//         }
//       }
//     }
//     quickSort(array, 0, length);
//   }

  function ArraySort (array, comparefn) {
    function InsertionSort (a, from, to) {
      for (var i = from + 1; i < to; i++) {
        var element = a[i];
        for (var j = i - 1; j >= from; j--) {
          var tmp = a[j];
          var order = comparefn(tmp, element);
          if (order > 0) {
            a[j + 1] = tmp;
          } else {
            break;
          }
        }
        a[j + 1] = element;
      }
    };
  
    function GetThirdIndex (a, from, to) {
      var t_array = new Array();
      // Use both 'from' and 'to' to determine the pivot candidates.
      var increment = 200 + ((to - from) & 15);
      var j = 0;
      from += 1;
      to -= 1;
      for (var i = from; i < to; i += increment) {
        t_array[j] = [i, a[i]];
        j++;
      }
      t_array.sort(function (a, b) {
        return comparefn(a[1], b[1]);
      });
      var third_index = t_array[t_array.length >> 1][0];
      return third_index;
    }
    function QuickSort (a, from, to) {
      // 基准选择第一个元素
      var third_index = 0;
      while (true) {
        // 待排序数组长度 <= 10 采用插入排序
        if (to - from <= 10) {
          InsertionSort(a, from, to);
          return;
        }
        if (to - from > 1000) {
          // 每隔 200 ~ 215 （根据 length & 15的结果）个元素取一个值，
          // 然后将这些值进行排序，取中间值的下标
          // 这里的排序其实又是一个递归调用
          third_index = GetThirdIndex(a, from, to);
        } else {
          // 将中间元素设为基准值
          third_index = from + ((to - from) >> 1);
        }
        // 将第一个,中间元素（上面获取的基准值），最后一个元素三者中的中位数作为基准值
        var v0 = a[from];
        var v1 = a[third_index];
        var v2 = a[to - 1];
        var c01 = comparefn(v0, v1);
        if (c01 > 0) {
          // v1 < v0, so swap them.
          var tmp = v0;
          v0 = v1;
          v1 = tmp;
        }
        // 此时 v0 <= v1.
        var c02 = comparefn(v0, v2);
        if (c02 > 0) {
          // v2 < v0 <= v1.的情况 进行交换
          var tmp = v0;
          v0 = v2;
          v2 = v1;
          v1 = tmp;
        } else {
          // v0 <= v1 && v0 <= v2
          var c12 = comparefn(v1, v2);
          if (c12 > 0) {
            // v1 > v2
            var tmp = v1;
            v1 = v2;
            v2 = tmp;
          }
        }
        // 最终效果 v0 <= v1 <= v2
        a[from] = v0;
        a[to - 1] = v2;
        var pivot = v1;
        var low_end = from + 1;   // 比基准值小的元素的上界
        var high_start = to - 1;  // 比基准值大的元素的下界
        // 将基准值与 from + 1 位置的元素进行互换
        // 此时 from + 1 位置的元素肯定是要排 form 位置后面的
        if (comparefn(pivot, a[low_end]) !== 0) {
          a[third_index] = a[low_end];
          a[low_end] = pivot;
        } else {
          a[third_index] = pivot
        }
  
        // 划分函数 将小于（假设升序排序）基准值的元素排在左边
        partition: for (var i = low_end + 1; i < high_start; i++) {
          var element = a[i];
          var order = comparefn(element, pivot);
          if (order < 0) {
            a[i] = a[low_end];
            a[low_end] = element;
            low_end++;
          } else if (order > 0) {
            // 当待排序元素大于基准值时，
            // 与到右侧第一个小于基准值的元素互换
            do {
              high_start--;
              if (high_start == i) break partition;
              var top_elem = a[high_start];
              order = comparefn(top_elem, pivot);
            } while (order > 0);
            a[i] = a[high_start];
            a[high_start] = element;
            // 该元素小于基准值，需要排在基准值左边
            if (order < 0) {
              element = a[i];
              a[i] = a[low_end];
              a[low_end] = element;
              low_end++;
            }
          }
        }
        // 对左右两个子数组再进行排序
        // 先处理待排序元素较少的
        if (to - high_start < low_end - from) {
          QuickSort(a, high_start, to);
          to = low_end;
        } else {
          QuickSort(a, from, low_end);
          from = high_start;
        }
      }
    };
    QuickSort(array, 0, array.length)
    return array
  }