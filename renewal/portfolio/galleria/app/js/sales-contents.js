$(document).ready(function () {
	addItem();
});

// Item 추가 (위탁상품, 문의상품)
function addItem() {
	var itemWrap = $(".inquiry");
	var itemLength = 1;
	var itemNode = "<div class='inquiry-wrap add'>";
	itemNode += `<div class="inquiry-header row">
					<div class="title">상품정보
					</div>
					<div class="item">
						<button type="button" class="btn">
							<img
								class="icon"
								src="../images/icon-minus.svg"
								alt="상품삭제"
							/>
						</button>
					</div>
				</div>			
				<div class="inquiry-body">
					<div class="form-group row">
						<label for="" class="form-label col-3"
							>브랜드<span class="required">*</span></label
						>
						<div class="col-9 info-text">
							<input
								type="text"
								placeholder=""
								class="form-control"
								value="브랜드"
								required
							/>
						</div>
						<p class="error">브랜드를 확인하세요.</p>
					</div>
					<div class="form-group row">
						<label for="" class="form-label col-3">상품명</label>
						<div class="col-9 info-text">
							<input
								type="text"
								class="form-control"
								value="상품명"
								placeholder=""
							/>
						</div>
					</div>
					<div class="form-group row">
						<label for="" class="form-label picture-label col-3"
							>사진<span class="required">*</span></label
						>
						<div class="col-9 picture-item-wrap">
							<div class="image-item">
								<input
									type="file"
									id="file-input-add"
									accept="image/jpg,image/jpeg,image/png,image/gif;capture=camera"
									multiple="true"
									hidden=""
								/>
								<label for="file-input-add"
									><img
										class="icon"
										src="../images/galleria-add-picture-button.svg"
										alt="사진추가"
									/>
								</label>
							</div>
						</div>
						<p class="error">등록가능한 파일이 아닙니다.</p>
						<p class="error">용량이 초과되었습니다.</p>
						<p class="error">사진을 등록하세요.</p>
					</div>
					<p class="info-message">
						판매를 원하시는 상품의 실제 사진을 올려주세요 <br />최소 1장의
						경우 정면사진을 올려주세요(최대 5장)<br />20MB이하의 이미지 파일만 등록할 수 있습니다.
						(JPG/GIF/PNG)
					</p>
				</div>
				<div class="divider"></div></div>`;

	$(".add-item-btn").on("click", function () {
		if (itemLength == 6) {
			return;
		}

		itemWrap.append(itemNode);
		itemLength++;
	});
}

// modal열릴때 body 스크롤 막기
$("#infoModal").on("show.bs.modal", function () {
	// $("html, body").addClass("modal-open");

	if ($("body").hasClass("modal-open")) {
		// alert("open이영!");
		$("body").removeClass("modal-open");
	} else {
		$("body").addClass("modal-open");
	}
});

$("#salesInquiryModal").on("show.bs.modal", function () {
	if ($("body").hasClass("modal-open")) {
		$("body").removeClass("modal-open");
	} else {
		$("body").addClass("modal-open");
	}
});
