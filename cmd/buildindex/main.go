package main

import (
	"encoding/json"
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"path/filepath"
	"strings"
)

type dirInfo struct {
	Name  string   `json:"name,omitempty"`
	Files []string `json:"files,omitempty"`

	// absolute path
	path string `json:"-"`
}

func (d dirInfo) saveIndex() {
	file, err := json.MarshalIndent(d, "", " ")
	if err != nil {
		log.Printf("error writing json\n")
		return
	}
	err = ioutil.WriteFile(filepath.Join(d.path, "index.json"), file, 0644)
	if err != nil {
		log.Printf("error writing index: %s\n", err.Error())
		return
	}
	log.Printf("write index: %s\n", d.path)
}

func main() {
	dir := dirInfo{}

	filepath.WalkDir("unicons", func(path string, d fs.DirEntry, err error) error {
		if d.IsDir() || !strings.HasSuffix(path, ".svg") {
			return nil // continue
		}
		idx := strings.LastIndex(path, "/")
		folder := path[:idx]
		if dir.path != folder {
			if len(dir.Files) > 0 {
				dir.saveIndex()
			}
			idx := strings.LastIndex(folder, "/")
			dir = dirInfo{
				path: folder,
				Name: folder[idx+1:],
			}
		}

		dir.Files = append(dir.Files, d.Name())
		return nil
	})

	if len(dir.Files) > 0 {
		dir.saveIndex()
	}

	// files, err := ioutil.ReadDir("unicons/svg/monochrome")
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// for _, file := range files {
	// 	//	fmt.Printf("%s\n", file.Name())

	// 	names = append(names, file.Name())
	// }

	// root := "/some/folder/to/scan"
	// err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
	// 	files = append(files, path)
	// 	return nil
	// })

	fmt.Printf("done!\n")

}
