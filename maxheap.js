// JavaScript code to depict  the implementation of a max heap.

class MaxHeap {
	constructor(maxSize) {
		// the array in the heap.
		this.arr = new Array(maxSize).fill(null);

		// Maximum possible size of
		// the Max Heap.
		this.maxSize = maxSize;

		// Number of elements in the
		// Max heap currently.
		this.heapSize = 0;
	}

	// Heapifies a sub-tree taking the
	// given index as the root.
	MaxHeapify(i) {
		const l = this.lChild(i);
		const r = this.rChild(i);
		let largest = i;
		if (l < this.heapSize && this.arr[l] > this.arr[i]) {
			largest = l;
		}
		if (r < this.heapSize && this.arr[r] > this.arr[largest]) {
			largest = r;
		}
		if (largest !== i) {
			const temp = this.arr[i];
			this.arr[i] = this.arr[largest];
			this.arr[largest] = temp;
			this.MaxHeapify(largest);
		}
	}

	// Returns the index of the parent
	// of the element at ith index.
	parent(i) {
		return Math.floor((i - 1) / 2);
	}

	// Returns the index of the left child.
	lChild(i) {
		return 2 * i + 1;
	}

	// Returns the index of the
	// right child.
	rChild(i) {
		return 2 * i + 2;
	}

	// Removes the root which in this
	// case contains the maximum element.
	removeMax() {
		// Checking whether the heap array
		// is empty or not.
		if (this.heapSize <= 0) {
			return null;
		}
		if (this.heapSize === 1) {
			this.heapSize -= 1;
			return this.arr[0];
		}

		// Storing the maximum element
		// to remove it.
		const root = this.arr[0];
		this.arr[0] = this.arr[this.heapSize - 1];
		this.heapSize -= 1;

		// To restore the property
		// of the Max heap.
		this.MaxHeapify(0);

		return root;
	}

	// Increases value of key at
	// index 'i' to new_val.
	increaseKey(i, newVal) {
		this.arr[i] = newVal;
		while (i !== 0 && this.arr[this.parent(i)] < this.arr[i]) {
			const temp = this.arr[i];
			this.arr[i] = this.arr[this.parent(i)];
			this.arr[this.parent(i)] = temp;
			i = this.parent(i);
		}
	}

	// Returns the maximum key
	// (key at root) from max heap.
	getMax() {
		return this.arr[0];
	}

	curSize() {
		return this.heapSize;
	}

	// Deletes a key at given index i.
	deleteKey(i) {
		// It increases the value of the key
		// to infinity and then removes
		// the maximum value.
		this.increaseKey(i, Infinity);
		this.removeMax();
	}

	// Inserts a new key 'x' in the Max Heap.
	insertKey(x) {
		// To check whether the key
		// can be inserted or not.
		if (this.heapSize === this.maxSize) {
			console.log("\nOverflow: Could not insertKey\n");
			return;
		}

		let i = this.heapSize;
		this.arr[i] = x;

		// The new key is initially
		// inserted at the end.
		this.heapSize += 1;



		// The max heap property is checked
		// and if violation occurs,
		// it is restored.
		while (i !== 0 && this.arr[this.parent(i)] < this.arr[i]) {
			const temp = this.arr[i];
			this.arr[i] = this.arr[this.parent(i)];
			this.arr[this.parent(i)] = temp;
			i = this.parent(i);
		}
	}
}


// Driver program to test above functions.

// Assuming the maximum size of the heap to be 15.
const h = new MaxHeap(15);

// Asking the user to input the keys:
console.log("Entered 6 keys:- 3, 10, 12, 8, 2, 14 \n");

h.insertKey(3);
h.insertKey(10);
h.insertKey(12);
h.insertKey(8);
h.insertKey(2);
h.insertKey(14);


// Printing the current size
// of the heap.
console.log(
	"The current size of the heap is " + h.curSize() + "\n"
);


// Printing the root element which is
// actually the maximum element.
console.log(
	"The current maximum element is " + h.getMax() + "\n"
);


// Deleting key at index 2.
h.deleteKey(2);


// Printing the size of the heap
// after deletion.
console.log(
	"The current size of the heap is " + h.curSize() + "\n"
);


// Inserting 2 new keys into the heap.
h.insertKey(15);
h.insertKey(5);

console.log(
	"The current size of the heap is " + h.curSize() + "\n"
);

console.log(
	"The current maximum element is " + h.getMax() + "\n"
);

// Contributed by sdeadityasharma
