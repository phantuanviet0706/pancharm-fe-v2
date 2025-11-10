// components/files/FileInputManager.ts
export type RemoteFile = { url: string; name?: string; path?: string };

export type MixedValue =
	| null
	| undefined
	| string
	| RemoteFile
	| File
	| Array<string | RemoteFile | File>;

export interface EmitOptions {
	multiple: boolean;
	primaryIndex: number | null;
}

/** Quản lý danh sách file: remote (đã có) + local (mới chọn) */
export class FileInputManager {
	remote: RemoteFile[] = [];
	local: File[] = [];
	primaryIndex: number | null = null;
	multiple: boolean;

	constructor(multiple = false) {
		this.multiple = multiple;
	}

	/** Convert string | obj -> RemoteFile */
	static toRemote(v: any): RemoteFile | null {
		if (!v) return null;
		if (typeof v === "string") return { url: v, path: v };
		if (typeof v === "object") {
			const url =
				typeof v.url === "string" ? v.url : typeof v.path === "string" ? v.path : null;
			if (!url) return null;
			return {
				url,
				path: v.path ?? (typeof v.url === "string" ? v.url : undefined),
				name: v.name,
			};
		}
		return null;
	}

	/** Chuẩn hoá value bind từ server -> remote[] */
	setInitialValue(v: MixedValue) {
		if (!v) {
			this.remote = [];
			this.local = [];
			this.primaryIndex = null;
			return;
		}
		if (v instanceof File) {
			// bind 1 file local không hợp lệ ở init -> coi như trống
			this.remote = [];
			this.local = [];
			this.primaryIndex = null;
			return;
		}
		const arr = Array.isArray(v) ? v : [v];
		this.remote = arr.map(FileInputManager.toRemote).filter(Boolean) as RemoteFile[];
		if (!this.multiple) this.local = []; // single: clear mọi local khi bind mới
		this.primaryIndex = this.remote.length || this.local.length ? 0 : null;
	}

	addLocalFiles(files: File[]) {
		if (!files.length) return;
		if (this.multiple) {
			this.local = [...this.local, ...files];
			if (this.primaryIndex == null && this.remote.length + this.local.length > 0) {
				this.primaryIndex = 0;
			}
		} else {
			this.local = [files[0]];
			this.remote = [];
			this.primaryIndex = 0;
		}
	}

	removeAt(idx: number) {
		if (idx < this.remote.length) {
			this.remote = this.remote.filter((_, i) => i !== idx);
		} else {
			const li = idx - this.remote.length;
			this.local = this.local.filter((_, i) => i !== li);
		}
		if (this.primaryIndex != null) {
			if (idx === this.primaryIndex) this.primaryIndex = null;
			else if (idx < this.primaryIndex) this.primaryIndex = this.primaryIndex - 1;
		}
	}

	setDefault(idx: number) {
		this.primaryIndex = idx;
	}
	unsetDefault() {
		this.primaryIndex = null;
	}
	clearAll() {
		this.remote = [];
		this.local = [];
		this.primaryIndex = null;
	}

	/** Danh sách hiển thị hợp nhất */
	getShowing(): Array<{ kind: "remote" | "local"; label: string; url?: string; file?: File }> {
		const a = this.remote.map((r) => {
			const url = r.url || r.path || "";
			const label = r.name ?? (url ? url.split("/").pop() || "Tệp" : "Tệp");
			return { kind: "remote" as const, label, url };
		});
		const b = this.local.map((f) => ({ kind: "local" as const, label: f.name, file: f }));
		return [...a, ...b];
	}

	/** Giá trị emit ra ngoài (giữ nguyên format: remote object + File) */
	emitValue() {
		const merged = [
			...this.remote.map((r) => ({ kind: "remote" as const, v: r })),
			...this.local.map((f) => ({ kind: "local" as const, v: f })),
		];
		if (!merged.length) return this.multiple ? [] : null;

		const reorder = (arr: typeof merged) => {
			if (this.primaryIndex != null && arr[this.primaryIndex]) {
				const cp = [...arr];
				const [p] = cp.splice(this.primaryIndex, 1);
				return [p, ...cp];
			}
			return arr;
		};
		const ordered = reorder(merged);
		if (this.multiple) {
			return ordered.map((x) => (x.kind === "local" ? x.v : x.v));
		} else {
			const top = ordered[0];
			return top.kind === "local" ? top.v : top.v;
		}
	}

	/** Dùng khi cần build manifest + file mới để gửi FormData một key */
	buildManifestAndFiles() {
		const showing = this.getShowing();
		const order: string[] = [];
		const files: File[] = [];
		let newIdx = 0;

		showing.forEach((it) => {
			if (it.kind === "local" && it.file) {
				order.push(`NEW_${newIdx}`);
				files.push(it.file);
				newIdx++;
			} else {
				const url = it.url ?? "";
				order.push(url);
			}
		});

		const _default =
			this.primaryIndex != null ? (order[this.primaryIndex] ?? "") : (order[0] ?? "");
		return { manifest: { order, _default }, files };
	}
}
